package main

import "go.uber.org/fx"

func main() {
	app := fx.New(
	// fx.Invoke(StartDiscordAuthService),
	)

	app.Run()
}
