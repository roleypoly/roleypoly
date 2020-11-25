package loginbounce

import (
	"bytes"
	"net/http"
	"text/template"

	"github.com/segmentio/ksuid"

	"github.com/roleypoly/roleypoly/src/common"
	"github.com/roleypoly/roleypoly/src/common/faas"
)

var (
	redirectPathTemplate = template.Must(
		template.New("redirect").Parse(
			`https://discord.com/api/oauth2/authorize?client_id={{.ClientID}}&scope=identify,guilds&redirect_uri={{.RedirectURI}}&state={{.State}}`,
		),
	)
	clientID    = common.Getenv("BOT_CLIENT_ID").String()
	redirectURI = common.Getenv("OAUTH_REDIRECT_URI").String()
)

type redirectPathData struct {
	ClientID    string
	RedirectURI string
	State       string
}

func LoginBounce(rw http.ResponseWriter, r *http.Request) {
	faas.Stash(rw, r.URL.Query().Get("redirect_url"))

	pathData := redirectPathData{
		ClientID:    clientID,
		RedirectURI: redirectURI,
		State:       ksuid.New().String(),
	}

	pathBuffer := bytes.Buffer{}
	redirectPathTemplate.Execute(&pathBuffer, pathData)

	faas.Bounce(rw, pathBuffer.String())
}
