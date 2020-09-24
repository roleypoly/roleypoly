package httpservice

import "github.com/julienschmidt/httprouter"

type HTTPService struct {
	config struct {
		ClientID  string
		PublicURL string
	}
}

func NewHTTPService() *HTTPService {
	return &HTTPService{}
}

func RegisterRoutes(s *HTTPService, router *httprouter.Router) {
	s.RegisterRoutes(router)
}

func (h *HTTPService) RegisterRoutes(router *httprouter.Router) {
	router.GET(h.v3("/oauth-handoff"), h.oauthHandoffv3)
}

func (*HTTPService) v3(path string) string {
	return `/discord-auth/v3` + path
}

func (*HTTPService) v4(path string) string {
	return `/discord-auth/v4` + path
}

func (h *HTTPService) getOauthRedirectURL() string {
	return h.config.PublicURL + h.v3("/oauth-callback")
}
