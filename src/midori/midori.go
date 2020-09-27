package main

import (
	"github.com/bwmarrin/discordgo"
	_ "github.com/joho/godotenv/autoload"
	"k8s.io/klog"

	"github.com/roleypoly/roleypoly/src/common/bot"
	"github.com/roleypoly/roleypoly/src/common/version"
	"github.com/roleypoly/roleypoly/src/midori/internal/commands/gh"
	"github.com/roleypoly/roleypoly/src/midori/internal/commands/tfc"
	"github.com/roleypoly/roleypoly/src/midori/internal/config"
)

func main() {
	klog.Info(version.StartupInfo("midori"))

	mux := bot.NewCommandMux(bot.MentionMatcher(config.ClientID))
	mux.RegisterCommandGroup("gh", gh.GitHubCommands{}.CommandGroup())
	mux.RegisterCommandGroup("tfc", tfc.TerraformCloudCommands{}.CommandGroup())

	err := bot.ScaffoldBot(bot.BotScaffolding{
		AllowBots:      false,
		BotToken:       config.BotToken,
		BotClientID:    config.ClientID,
		RootUsers:      config.RootUsers,
		GatewayIntents: discordgo.IntentsGuildMessages,
		Handler:        mux.Handler,
	})
	if err != nil {
		klog.Fatal(err)
	}
}
