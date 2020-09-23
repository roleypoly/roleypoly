package main

import (
	"os"
	"os/signal"
	"regexp"
	"strings"
	"syscall"

	"github.com/bwmarrin/discordgo"
	_ "github.com/joho/godotenv/autoload"
	"github.com/lampjaw/discordclient"
	"github.com/roleypoly/roleypoly/src/common/version"
	"k8s.io/klog"
)

var (
	botToken    = os.Getenv("DISCORD_BOT_TOKEN")
	botClientID = os.Getenv("DISCORD_CLIENT_ID")
	rootUsers   = strings.Split(os.Getenv("ROOT_USERS"), ",")
	allowedBots = strings.Split(os.Getenv("ALLOWED_BOTS"), ",")
	appURL      = os.Getenv("PUBLIC_URL")

	selfMention = regexp.MustCompile("<@!?" + botClientID + ">")
)

func main() {
	klog.Info(version.StartupInfo("discord-bot"))

	discordClient := discordclient.NewDiscordClient(botToken, rootUsers[0], botClientID)
	discordClient.GatewayIntents = discordgo.IntentsGuildMessages

	messageChannel, err := discordClient.Listen(-1)
	if err != nil {
		klog.Fatal(err)
	}

	defer awaitExit()

	l := listener{
		client: discordClient,
	}

	go l.processMessages(messageChannel)
}

func isBotAllowlisted(userID string) bool {
	for _, id := range allowedBots {
		if id == userID {
			return true
		}
	}

	return false
}

func awaitExit() {
	syscallExit := make(chan os.Signal, 1)
	signal.Notify(
		syscallExit,
		syscall.SIGINT,
		syscall.SIGTERM,
		os.Interrupt,
		os.Kill,
	)
	<-syscallExit
}
