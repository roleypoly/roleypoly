package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	_ "github.com/joho/godotenv/autoload"

	botjoin "github.com/roleypoly/roleypoly/src/functions/bot-join"
	sessiondata "github.com/roleypoly/roleypoly/src/functions/session-data"
	sessionprewarm "github.com/roleypoly/roleypoly/src/functions/session-prewarm"
)

var mappings map[string]http.HandlerFunc = map[string]http.HandlerFunc{
	"/session-prewarm": sessionprewarm.SessionPrewarm,
	"/session-data":    sessiondata.SessionData,
	"/bot-join":        botjoin.BotJoin,
}

var port string

func main() {
	ctx := context.Background()

	err := funcframework.RegisterHTTPFunctionContext(ctx, "/", rootHandler)
	if err != nil {
		log.Fatalf("funcframework.RegisterHTTPFunctionContext: %v\n", err)
	}

	for path, handler := range mappings {
		err := funcframework.RegisterHTTPFunctionContext(ctx, path, handler)
		if err != nil {
			log.Fatalf("funcframework.RegisterHTTPFunctionContext: %v\n", err)
		}

		fmt.Println("Added", path)
	}

	// Use PORT environment variable, or default to 6600.
	port = "6600"
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}

	fmt.Printf("Starting on http://localhost:%s\n", port)

	if err := funcframework.Start(port); err != nil {
		log.Fatalf("funcframework.Start: %v\n", err)
	}
}

func rootHandler(rw http.ResponseWriter, r *http.Request) {
	body := `<!doctype html><meta charset="utf-8"><title>Roleypoly Functions</title><style>body{font-family: sans-serif; font-size: 1.4em}</style><h1>Function Index</h1>`

	for path := range mappings {
		body += fmt.Sprintf(`<a href="http://localhost:%s%s">%s</a><br>`, port, path, path)
	}

	fmt.Fprintln(rw, body)
}
