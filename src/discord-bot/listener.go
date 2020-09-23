package main

import (
	"github.com/lampjaw/discordclient"
	"k8s.io/klog"

	"github.com/roleypoly/roleypoly/src/discord-bot/internal/strings"
)

type listener struct {
	client *discordclient.DiscordClient
}

func (l *listener) processMessages(messageChannel <-chan discordclient.Message) {
	for {
		go l.handle(<-messageChannel)
	}
}

func (l *listener) handle(message discordclient.Message) {
	// Only if it's a message create
	if message.Type() != discordclient.MessageTypeCreate {
		return
	}

	// Only if it's an allowed bot
	if message.IsBot() && !isBotAllowlisted(message.UserID()) {
		return
	}

	// Only if it has the right mention
	if !selfMention.MatchString(message.RawMessage()) {
		return
	}

	l.defaultResponse(message)
}

func (l *listener) defaultResponse(message discordclient.Message) {
	channel := message.Channel()
	guild, err := message.ResolveGuildID()
	if err != nil {
		klog.Warning("failed to fetch guild, ", err)
	}

	l.client.SendMessage(
		channel,
		strings.Render(
			strings.MentionResponse,
			strings.MentionResponseData{GuildID: guild, AppURL: appURL},
		),
	)
}
