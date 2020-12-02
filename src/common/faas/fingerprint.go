package faas

import (
	"net/http"

	"github.com/roleypoly/roleypoly/src/common/types"
)

func Fingerprint(req *http.Request) types.Fingerprint {
	return types.Fingerprint{
		UserAgent:    req.UserAgent(),
		ClientIP:     req.RemoteAddr,
		ForwardedFor: req.Header.Get("x-forwarded-for"),
	}
}
