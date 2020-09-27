package bot

import (
	"context"

	"github.com/bwmarrin/discordgo"
	"github.com/lampjaw/discordclient"
	"github.com/roleypoly/roleypoly/src/common"
)

type HandlerFunc func(context.Context, discordclient.Message)

type BotScaffolding struct {
	BotToken       string
	BotClientID    string
	RootUsers      []string
	AllowBots      bool
	AllowEdits     bool
	AllowDeletes   bool
	GatewayIntents discordgo.Intent
	Handler        HandlerFunc
}

type Listener struct {
	DiscordClient *discordclient.DiscordClient
	config        *BotScaffolding
	handler       HandlerFunc
}

type ctxKey string

var ListenerCtxKey ctxKey = "listener"
var MessageCtxKey ctxKey = "message"

func ScaffoldBot(config BotScaffolding) error {
	discordClient := discordclient.NewDiscordClient(config.BotToken, config.RootUsers[0], config.BotClientID)
	discordClient.GatewayIntents = config.GatewayIntents
	discordClient.AllowBots = config.AllowBots

	messageChannel, err := discordClient.Listen(-1)
	if err != nil {
		return err
	}

	defer common.AwaitExit()

	listener := &Listener{
		config:        &config,
		DiscordClient: discordClient,
		handler:       config.Handler,
	}

	go listener.processMessages(messageChannel)

	return nil
}

func (l *Listener) processMessages(messageChannel <-chan discordclient.Message) {
	listenerCtx := context.WithValue(context.Background(), ListenerCtxKey, l)
	for {
		message := <-messageChannel

		if !l.config.AllowEdits && message.Type() == discordclient.MessageTypeUpdate {
			continue
		}

		if !l.config.AllowDeletes && message.Type() == discordclient.MessageTypeDelete {
			continue
		}

		localCtx := context.WithValue(listenerCtx, MessageCtxKey, message)
		go l.handler(localCtx, message)
	}
}

// ReplyToMessage will use the message context to reply to a message.
// Message may be one of two types:
// - *discordgo.MessageSend
// - string
func ReplyToMessage(listenerCtx context.Context, message interface{}) error {
	l := listenerCtx.Value(ListenerCtxKey).(*Listener)
	m := listenerCtx.Value(MessageCtxKey).(discordclient.Message)
	channelID := m.Channel()

	switch message.(type) {
	case *discordgo.MessageSend:
		_, err := l.DiscordClient.Session.ChannelMessageSendComplex(channelID, message.(*discordgo.MessageSend))
		if err != nil {
			return err
		}
	case string:
		return l.DiscordClient.SendMessage(channelID, message.(string))
	}

	return nil
}

// NoOpHandlerFunc does no operations againdst a message. This can be an equivalent to nil.
func NoOpHandlerFunc(context.Context, discordclient.Message) {

}
