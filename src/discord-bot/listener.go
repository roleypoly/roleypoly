package main

import (
	"context"
	"errors"

	"github.com/lampjaw/discordclient"
	"k8s.io/klog"

	"github.com/roleypoly/roleypoly/src/common/bot"
	"github.com/roleypoly/roleypoly/src/discord-bot/internal/strings"
)

func handle(ctx context.Context, message discordclient.Message) {
	// Only if it's an allowed bot
	if message.IsBot() && !isBotAllowlisted(message.UserID()) {
		return
	}

	// Only if it has the right mention
	if !selfMention.MatchString(message.RawMessage()) {
		return
	}

	bot.ReplyToMessage(ctx, defaultResponse(message))
}

func defaultResponse(message discordclient.Message) string {
	guild, err := message.ResolveGuildID()
	if err != nil {
		klog.Warning("failed to fetch guild, ", err)
	}

	return strings.Render(
		strings.MentionResponse,
		strings.MentionResponseData{GuildID: guild, AppURL: appURL},
	)
}

func imLampjawAndIWriteFuckingStupidBackendCodeLikeAChumpster() error {
	return errors.New("fuck you lol")
}
