package gripkit

import (
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
)

type HTTPOptions struct {
	TLSCertPath string
	TLSKeyPath  string
	Addr        string
}

type HealthzOptions struct {
	UseDefault bool
	Handler    http.HandlerFunc

	// Optional IP:Port string, defaults to :10456
	Addr string
}

type Option func(*options)

type options struct {
	wrapGrpcWeb    bool
	grpcWebOptions []grpcweb.Option
	httpOptions    HTTPOptions
	grpcOptions    []grpc.ServerOption
	wrapDebug      bool
	healthz        *HealthzOptions
}

var (
	defaultOptions = &options{
		wrapGrpcWeb:    false,
		grpcWebOptions: []grpcweb.Option{},
		grpcOptions:    []grpc.ServerOption{},
		wrapDebug:      false,
		httpOptions: HTTPOptions{
			Addr:        ":8080",
			TLSKeyPath:  "",
			TLSCertPath: "",
		},
		healthz: &HealthzOptions{
			UseDefault: true,
		},
	}
)

func evaluateOptions(optionList ...Option) *options {
	evaluatedOptions := defaultOptions

	for _, optionFunc := range optionList {
		if optionFunc != nil {
			optionFunc(evaluatedOptions)
		}
	}

	return evaluatedOptions
}

func WithDebug() Option {
	return func(o *options) {
		o.wrapDebug = true
	}
}

func WithGrpcWeb(opts ...grpcweb.Option) Option {
	return func(o *options) {
		o.wrapGrpcWeb = true
		o.grpcWebOptions = opts
	}
}

func WithOptions(opts ...grpc.ServerOption) Option {
	return func(o *options) {
		o.grpcOptions = opts
	}
}

func WithHTTPOptions(opts HTTPOptions) Option {
	return func(o *options) {
		o.httpOptions = opts
	}
}

// WithHealthz adds a custom /healthz handler to the gRPC HTTP server. Pass nil to disable.
func WithHealthz(hzOpts *HealthzOptions) Option {
	return func(o *options) {
		if hzOpts == nil {
			o.healthz = nil
			return
		}

		if hzOpts.Addr != "" {
			o.healthz.Addr = hzOpts.Addr
		}

		o.healthz.Handler = hzOpts.Handler
	}
}
