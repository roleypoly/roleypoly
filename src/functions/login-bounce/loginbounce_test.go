package loginbounce_test

import (
	"net/http/httptest"
	"testing"

	"github.com/onsi/gomega"
	loginbounce "github.com/roleypoly/roleypoly/src/functions/login-bounce"
)

func TestBounce(t *testing.T) {
	O := gomega.NewWithT(t)

	req := httptest.NewRequest("GET", "/login-bounce?redirect_url=https://localhost:6600/test", nil)
	rw := httptest.NewRecorder()

	loginbounce.LoginBounce(rw, req)

	resp := rw.Result()

	O.Expect(resp.StatusCode).Should(gomega.BeIdenticalTo(303))
	O.Expect(resp.Header.Get("location")).Should(gomega.ContainSubstring("identify,guild"))
	O.Expect(resp.Header.Get("set-cookie")).Should(gomega.ContainSubstring("https://localhost:6600/test"))
}
