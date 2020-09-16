package main

import (
	"os"
	"os/signal"
	"strings"
	"syscall"

	"github.com/bwmarrin/discordgo"
	_ "github.com/joho/godotenv/autoload"
	"github.com/lampjaw/discordclient"
	"github.com/roleypoly/roleypoly/src/common/version"
	"k8s.io/klog"
)

func main() {
	klog.Info(version.StartupInfo("discord-bot"))

	botToken := os.Getenv("DISCORD_BOT_TOKEN")
	botClientID := os.Getenv("DISCORD_CLIENT_ID")
	rootUsers := strings.Split(os.Getenv("ROOT_USERS"), ",")

	discordClient := discordclient.NewDiscordClient(botToken, rootUsers[0], botClientID)
	discordClient.GatewayIntents = discordgo.IntentsNone

	messageChannel, err := discordClient.Listen(-1)
	if err != nil {
		klog.Fatal(err)
	}

	defer awaitExit()

	go processMessages(messageChannel)
}

func processMessages(messageChannel <-chan discordclient.Message) {
	for {
		message := <-messageChannel
		klog.Infoln("message: ", message.Message())
	}
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
