// Package gripkit provides wrappers and helpers for
package gripkit

import (
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
	"k8s.io/klog"
)

type Gripkit struct {
	Server        *grpc.Server
	httpHandler   *func(w http.ResponseWriter, r *http.Request)
	options       *options
	grpcWebServer *grpcweb.WrappedGrpcServer
	ready         bool
}

func Create(options ...Option) *Gripkit {
	gkOptions := evaluateOptions(options...)
	grpcServer := grpc.NewServer(gkOptions.grpcOptions...)

	var grpcWrapper *grpcweb.WrappedGrpcServer
	if gkOptions.wrapGrpcWeb {
		grpcWrapper = grpcweb.WrapServer(grpcServer, gkOptions.grpcWebOptions...)
	}

	gk := &Gripkit{
		Server:        grpcServer,
		grpcWebServer: grpcWrapper,
		options:       gkOptions,
		ready:         false,
	}

	if gk.options.healthz != nil {
		if gk.options.healthz.UseDefault {
			if gk.options.healthz.Addr == "" {
				gk.options.healthz.Addr = ":10456"
			}

			gk.options.healthz.Handler = gk.defaultHealthHandler
		}

		go gk.startHealthzServer()
	}

	return gk
}

func (gk *Gripkit) Serve() error {
	handler := gk.Server.ServeHTTP
	if gk.options.wrapGrpcWeb {
		handler = gk.grpcWebServer.ServeHTTP
	}

	httpHandler := http.HandlerFunc(handler)

	if gk.options.wrapDebug {
		httpHandler = http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
			source := "gRPC native"
			if req.Header.Get("X-Grpc-Web") == "1" {
				source = "gRPC web"
			}
			klog.Infoln("gRPC debug: url:", req.URL, "source:", source)
			handler(resp, req)
		})
	}

	if gk.options.httpOptions.TLSCertPath == "" || gk.options.httpOptions.TLSKeyPath == "" {
		return http.ListenAndServe(
			gk.options.httpOptions.Addr,
			httpHandler,
		)
	}

	gk.ready = true

	return http.ListenAndServeTLS(
		gk.options.httpOptions.Addr,
		gk.options.httpOptions.TLSCertPath,
		gk.options.httpOptions.TLSKeyPath,
		httpHandler,
	)
}

func (gk *Gripkit) startHealthzServer() {
	klog.Infoln("Starting /healthz server on", gk.options.healthz.Addr)
	err := http.ListenAndServe(gk.options.healthz.Addr, gk.options.healthz.Handler)
	if err != nil {
		klog.Errorln("/healthz server failed to start", err)
	}
}

func (gk *Gripkit) defaultHealthHandler(rw http.ResponseWriter, r *http.Request) {
	if gk.ready {
		rw.WriteHeader(http.StatusOK)
		rw.Write([]byte(`OK`))
	} else {
		rw.WriteHeader(http.StatusServiceUnavailable)
		rw.Write([]byte(`Not Ready`))
	}
}
