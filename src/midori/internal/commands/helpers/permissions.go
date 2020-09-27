package helpers

import (
	"context"

	"github.com/lampjaw/discordclient"
	"github.com/roleypoly/roleypoly/src/common"
	"github.com/roleypoly/roleypoly/src/common/bot"
	"github.com/roleypoly/roleypoly/src/midori/internal/config"
)

// MustHaveElevatedPermissions ensures a command has either Developer or Root role conditions.
func MustHaveElevatedPermissions(next bot.HandlerFunc) bot.HandlerFunc {
	return func(ctx context.Context, message discordclient.Message) {
		if common.FindString(message.UserID(), config.RootUsers) || common.FindString(message.UserID(), config.AllowlistedUsers) {
			next(ctx, message)
			return
		}

		NoPermissionsResponse(ctx, message)
	}
}

// NoPermissionsResponse responds with a simple message that shows why the command failed.
func NoPermissionsResponse(ctx context.Context, message discordclient.Message) {
	bot.ReplyToMessage(ctx, "⛔ You do not have elevated permissions.")
}
