package httpservice

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/segmentio/ksuid"
)

// Handles flow start request by redirecting the user to Discord OAuth page
func (h *HTTPService) oauthHandoffv3(rw http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	// TODO: actually create and store this state
	requestState := ksuid.New().String()

	redirectURL := fmt.Sprintf(
		`https://discord.com/oauth2/authorize?client_id=%s&redirect_uri=%s&response_type=code&scope=identify&state=%s`,
		h.config.ClientID,
		h.getOauthRedirectURL(),
		requestState,
	)

	rw.Header().Add("location", redirectURL)
	rw.WriteHeader(303)
}
