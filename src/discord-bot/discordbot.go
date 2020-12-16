package main

import (
	"github.com/bwmarrin/discordgo"
	_ "github.com/joho/godotenv/autoload"
	"github.com/roleypoly/roleypoly/src/common"
	"github.com/roleypoly/roleypoly/src/common/bot"
	"k8s.io/klog"
)

var (
	botToken    = common.Getenv("BOT_TOKEN").String()
	botClientID = common.Getenv("BOT_CLIENT_ID").String()
	rootUsers   = common.Getenv("ROOT_USERS").StringSlice()
	allowedBots = common.Getenv("ALLOWED_BOTS").StringSlice()
	appURL      = common.Getenv("UI_PUBLIC_URI").SafeURL()
	selfMention = bot.MentionMatcher(botClientID)
)

func main() {
	klog.Info("bot started")

	err := bot.ScaffoldBot(bot.BotScaffolding{
		RootUsers:      rootUsers,
		AllowBots:      true,
		BotClientID:    botClientID,
		BotToken:       botToken,
		GatewayIntents: discordgo.IntentsGuildMessages,
		Handler:        handle,
	})
	if err != nil {
		klog.Fatal(err)
	}
}

func isBotAllowlisted(userID string) bool {
	for _, id := range allowedBots {
		if id == userID {
			return true
		}
	}

	return false
}
