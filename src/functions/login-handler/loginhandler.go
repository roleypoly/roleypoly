package loginhandler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/url"
	"time"

	"github.com/roleypoly/roleypoly/src/common"
	"github.com/roleypoly/roleypoly/src/common/faas"
	"github.com/roleypoly/roleypoly/src/common/types"
	"github.com/segmentio/ksuid"
	"k8s.io/klog"
)

var (
	// HTTPClient is an overridable HTTP client with a 15 second timeout
	HTTPClient   = http.Client{Timeout: 15 * time.Second}
	uiPath       = common.Getenv("UI_PUBLIC_URI").SafeURL()
	apiPath      = common.Getenv("API_PUBLIC_URI").SafeURL()
	clientID     = common.Getenv("BOT_CLIENT_ID").String()
	clientSecret = common.Getenv("BOT_CLIENT_SECRET").String()
	redirectURI  = common.Getenv("OAUTH_REDIRECT_URI").String()
)

func LoginHandler(rw http.ResponseWriter, req *http.Request) {
	query := req.URL.Query()

	state := query.Get("state")
	stateID, err := ksuid.Parse(state)
	if err != nil || stateID.IsNil() || stateID.Time().Add(5*time.Minute).Before(time.Now()) {
		faas.Bounce(rw, uiPath+"/machinery/error?error_code=auth_failure")
		return
	}

	code := query.Get("code")

	body := url.Values{}
	body.Set("client_id", clientID)
	body.Set("client_secret", clientSecret)
	body.Set("grant_type", "authorization_code")
	body.Set("code", code)
	body.Set("redirect_uri", redirectURI)
	body.Set("scope", "identify guilds")

	response, err := HTTPClient.PostForm("https://discord.com/api/v8/oauth2/token", body)
	if err != nil {
		klog.Error("token fetch failed: ", err)
		faas.Bounce(rw, uiPath+"/machinery/error?error_code=auth_failure")
		return
	}

	tokens := types.AccessTokenResponse{}
	json.NewDecoder(response.Body).Decode(&tokens)

	sessionRequest := types.CreateSessionRequest{
		AccessTokenResponse: tokens,
		Fingerprint:         faas.Fingerprint(req),
	}

	buf := bytes.Buffer{}
	json.NewEncoder(&buf).Encode(sessionRequest)

	response, err = HTTPClient.Post(apiPath+"/create-session", "application/json", &buf)
	if err != nil {
		klog.Error("create session failed: ", err)
		faas.Bounce(rw, uiPath+"/machinery/error?error_code=auth_failure")
		return
	}

	session := types.CreateSessionResponse{}
	json.NewDecoder(response.Body).Decode(&session)

	faas.Bounce(rw, uiPath+"/machinery/new-session?session_id="+session.SessionID)
}
