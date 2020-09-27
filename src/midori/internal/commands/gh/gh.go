package gh

import (
	"context"
	"encoding/json"
	"strings"

	"github.com/google/go-github/v32/github"
	"github.com/lampjaw/discordclient"
	"github.com/roleypoly/roleypoly/src/common/bot"
	"github.com/roleypoly/roleypoly/src/midori/internal/commands/helpers"
	"github.com/roleypoly/roleypoly/src/midori/internal/config"
	"golang.org/x/oauth2"
)

type GitHubCommands struct {
	ghClient *github.Client
}

func NewGitHubCommands() GitHubCommands {
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: config.GitHubToken},
	)
	tc := oauth2.NewClient(ctx, ts)
	ghClient := github.NewClient(tc)

	return GitHubCommands{
		ghClient: ghClient,
	}
}

func (ghc GitHubCommands) CommandGroup() bot.CommandGroup {
	return bot.CommandGroup{
		{
			CommandName: "dispatch",
			Handler:     helpers.MustHaveElevatedPermissions(ghc.dispatch),
		},
	}
}

func (ghc GitHubCommands) dispatch(ctx context.Context, message discordclient.Message) {
	tokens := bot.Tokenize(message)
	repo, webhookName := tokens[0], tokens[1]
	payload := json.RawMessage(strings.Join(tokens[2:], " "))

	ghc.ghClient.Repositories.Dispatch(ctx, config.GitHubOrg, repo, github.DispatchRequestOptions{
		EventType:     webhookName,
		ClientPayload: &payload,
	})
}
