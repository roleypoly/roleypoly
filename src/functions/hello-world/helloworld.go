package helloworld

import (
	"fmt"
	"net/http"
)

func HelloWorld(rw http.ResponseWriter, req *http.Request) {
	fmt.Fprintln(rw, "Hello "+req.RemoteAddr+"!")
}
