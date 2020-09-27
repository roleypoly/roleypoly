package config

import (
	"github.com/roleypoly/roleypoly/src/common"
)

var (
	BotToken         = common.Getenv("MIDORI_BOT_TOKEN").String()
	ClientID         = common.Getenv("MIDORI_CLIENT_ID").String()
	AllowlistedUsers = common.Getenv("MIDORI_DEVELOPERS").StringSlice()
	CommandPrefix    = common.Getenv("MIDORI_PREFIX_OVERRIDE", "midori").String()
	RootUsers        = common.Getenv("ROOT_USERS").StringSlice()
	GitHubOrg        = common.Getenv("MIDORI_GITHUB_ORG").String()
	GitHubToken      = common.Getenv("MIDORI_GITHUB_TOKEN").String()
)
