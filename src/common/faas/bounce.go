package faas

import (
	"html/template"
	"net/http"
	"time"
)

var bounceHTML = template.Must(template.New("bounceHTML").Parse(
	`<!doctype html>
	<meta charset="utf8">
	<title>Redirecting...</title>
	<meta http-equiv="refresh" content="0;URL='{{.Location}}'">
	<style>
		body {
			background-color: #453E3D;
			color: #AB9B9A;
		}
		a {
			color: #AB9B9A;
		}
	</style>
	<p>
		Redirecting you to <a href="{{.Location}}">{{.Location}}</a>
	</p>
	`,
))

type bounceData struct {
	Location string
}

// Bounce will do a 303 See Other response with url.
func Bounce(rw http.ResponseWriter, url string) {
	rw.Header().Add("location", url)
	rw.WriteHeader(303)
	bounceHTML.Execute(rw, bounceData{Location: url})
}

// Stash will save the specified URL for later use in Unstash(), e.g. after an OAuth bounce
func Stash(rw http.ResponseWriter, url string) {
	if url == "" {
		return
	}

	cookie := http.Cookie{
		Name:     "rp_stashed_url",
		Value:    url,
		HttpOnly: true,
		Expires:  time.Now().Add(5 * time.Minute),
	}

	rw.Header().Add("set-cookie", cookie.String())
}

// Unstash will redirect/Bounce() to a previously stashed URL or the defaultURL, whichever is available.
func Unstash(rw http.ResponseWriter, req *http.Request, defaultURL string) {
	redirectURL := defaultURL
	cookie, _ := req.Cookie("rp_stashed_url")

	if cookie != nil && cookie.Expires.After(time.Now()) && cookie.Value != "" {
		redirectURL = cookie.Value
	}

	unsetter := http.Cookie{
		Name:     "rp_stashed_url",
		Value:    "",
		MaxAge:   -1,
		HttpOnly: true,
	}

	rw.Header().Set("set-cookie", unsetter.String())

	Bounce(rw, redirectURL)
}
