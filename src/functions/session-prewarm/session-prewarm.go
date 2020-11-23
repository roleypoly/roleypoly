package sessionprewarm

import "net/http"

func SessionPrewarm(rw http.ResponseWriter, r *http.Request) {
	rw.Write([]byte("hello work!"))
}
