package botjoin

import (
	"bytes"
	"net/http"
	"regexp"
	"text/template"

	"github.com/roleypoly/roleypoly/src/common"
	"github.com/roleypoly/roleypoly/src/common/faas"
)

var (
	validGuildID         = regexp.MustCompile(`^[0-9]+$`)
	redirectPathTemplate = template.Must(
		template.New("redirect").Parse(
			`https://discord.com/api/oauth2/authorize?client_id={{.ClientID}}&scope=bot&permissions={{.Permissions}}{{if .GuildID}}&guild_id={{.GuildID}}&disable_guild_select=true{{end}}`,
		),
	)
	clientID = common.Getenv("BOT_CLIENT_ID").String()
)

type redirectPathData struct {
	ClientID    string
	Permissions int
	GuildID     string
}

func BotJoin(rw http.ResponseWriter, r *http.Request) {
	guildID := r.URL.Query().Get("guild")
	if !validGuildID.MatchString(guildID) {
		guildID = ""
	}

	pathData := redirectPathData{
		ClientID:    clientID,
		Permissions: 268435456, // MANAGE_ROLES
		GuildID:     guildID,
	}

	pathBuffer := bytes.Buffer{}
	redirectPathTemplate.Execute(&pathBuffer, pathData)

	faas.Bounce(rw, pathBuffer.String())
}
