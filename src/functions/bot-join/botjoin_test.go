package botjoin_test

import (
	"net/http/httptest"
	"testing"

	"github.com/onsi/gomega"
	botjoin "github.com/roleypoly/roleypoly/src/functions/bot-join"
)

func TestGeneral(t *testing.T) {
	O := gomega.NewWithT(t)

	req := httptest.NewRequest("GET", "/bot-join", nil)
	resp := httptest.NewRecorder()

	botjoin.BotJoin(resp, req)

	result := resp.Result()
	O.Expect(result.StatusCode).Should(gomega.BeIdenticalTo(303))
	O.Expect(result.Header.Get("location")).ShouldNot(gomega.ContainSubstring("guild_id"))

}

func TestGeneralSpecific(t *testing.T) {
	O := gomega.NewWithT(t)

	req := httptest.NewRequest("GET", "/bot-join?guild=386659935687147521", nil)
	resp := httptest.NewRecorder()

	botjoin.BotJoin(resp, req)

	result := resp.Result()
	O.Expect(result.StatusCode).Should(gomega.BeIdenticalTo(303))
	O.Expect(result.Header.Get("location")).Should(gomega.ContainSubstring("guild_id=386659935687147521"))
}
