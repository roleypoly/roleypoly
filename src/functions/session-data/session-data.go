package sessiondata

import (
	"fmt"
	"net/http"
)

func SessionData(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(rw, "Hello world!")
}
