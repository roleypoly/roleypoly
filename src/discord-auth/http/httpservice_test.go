package httpservice

import (
	"testing"

	"github.com/julienschmidt/httprouter"
)

func TestV3Route(t *testing.T) {
	s := &HTTPService{}
	url := s.v3("/test")
	if url != "/discord-auth/v3/test" {
		t.FailNow()
	}
}

func TestV4Route(t *testing.T) {
	s := &HTTPService{}
	url := s.v4("/test")
	if url != "/discord-auth/v4/test" {
		t.FailNow()
	}
}

func TestRegisterRoutes(t *testing.T) {
	s := NewHTTPService()
	r := httprouter.New()
	RegisterRoutes(s, r)
}

func TestOauthRedirectURL(t *testing.T) {
	s := &HTTPService{
		config: struct{ ClientID, PublicURL string }{
			ClientID:  "",
			PublicURL: "https://roleypoly.local",
		},
	}

	url := s.getOauthRedirectURL()
	if url != "https://roleypoly.local/discord-auth/v3/oauth-callback" {
		t.FailNow()
	}
}
