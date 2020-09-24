package httpservice

import (
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/julienschmidt/httprouter"
)

func TestOauthHandoffV3(t *testing.T) {
	s := NewHTTPService()
	s.config.ClientID = "test1234"
	s.config.PublicURL = "https://roleypoly.test"

	rw := httptest.NewRecorder()
	r := httptest.NewRequest("GET", s.v3("/oauth-handoff"), nil)
	ps := httprouter.Params{}
	s.oauthHandoffv3(rw, r, ps)

	if rw.Result().StatusCode != 303 {
		t.Error("Status code was not 303, got ", rw.Result().StatusCode)
	}

	if !strings.Contains(rw.Result().Header.Get("location"), s.config.ClientID) &&
		!strings.Contains(rw.Result().Header.Get("location"), s.getOauthRedirectURL()) {
		t.Error("Location was not correct, got ", rw.Result().Header.Get("location"))
	}
}
