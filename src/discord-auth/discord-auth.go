package main

import (
	"context"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"go.uber.org/fx"
	"k8s.io/klog"

	"github.com/roleypoly/roleypoly/src/common/version"
	httpservice "github.com/roleypoly/roleypoly/src/discord-auth/http"
)

func main() {
	klog.Info(version.StartupInfo("discord-auth"))

	app := fx.New(
		fx.Provide(
			httprouter.New,
			httpservice.NewHTTPService,
		),
		fx.Invoke(
			httpservice.RegisterRoutes,
			newHTTPServer,
		),
	)

	app.Run()
}

func newHTTPServer(lc fx.Lifecycle, router *httprouter.Router) *http.Server {
	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	lc.Append(fx.Hook{
		OnStart: func(context.Context) error {
			klog.Info("Starting HTTP Server")
			go server.ListenAndServe()

			return nil
		},
		OnStop: func(ctx context.Context) error {
			klog.Info("Stopping HTTP Server")
			return server.Shutdown(ctx)
		},
	})

	return server
}

func startupHTTP()
