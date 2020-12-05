package types

type DiscordUser struct {
	ID            string `json:"id,omitempty"`
	Username      string `json:"username,omitempty"`
	Discriminator string `json:"discriminator,omitempty"`
	Avatar        string `json:"avatar,omitempty"`
	Bot           bool   `json:"bot,omitempty"`
}

type Member struct {
	GuildID string      `json:"guildid,omitempty"`
	Roles   []string    `json:"rolesList,omitempty"`
	Nick    string      `json:"nick,omitempty"`
	User    DiscordUser `json:"user,omitempty"`
}

type RoleypolyUser struct {
	DiscordUser DiscordUser `json:"discorduser,omitempty"`
}
