package tfc

import (
	"context"

	"github.com/lampjaw/discordclient"
	"github.com/roleypoly/roleypoly/src/common/bot"
	"github.com/roleypoly/roleypoly/src/midori/internal/commands/helpers"
)

type TerraformCloudCommands struct {
}

func (tfcc TerraformCloudCommands) CommandGroup() bot.CommandGroup {
	return bot.CommandGroup{
		{
			CommandName: "dispatch",
			Handler:     helpers.MustHaveElevatedPermissions(tfcc.dispatch),
		},
	}
}

func (tfcc TerraformCloudCommands) dispatch(ctx context.Context, message discordclient.Message) {
	bot.ReplyToMessage(ctx, "Ok!")
}
