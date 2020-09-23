package strings

import (
	"text/template"
)

var (
	// MentionResponse is a template that requires strings AppURL and GuildID.
	MentionResponse = template.Must(
		template.New("MentionResponse").Parse(
			`:beginner: Assign your roles here! {{ .AppURL }}/s/{{ .GuildID }}`,
		),
	)

	RootStats = template.Must(
		template.New("RootStats").Parse(`🐈
**People Stats**
<:blank:676216695375003650>🙎‍♀️ **Total Users:** {{ .Users }}
<:blank:676216695375003650>👨‍👩‍👦‍👦 **Total Guilds:** {{ .Guilds }}
<:blank:676216695375003650>🦺 **Total Roles:** {{ .Roles }}

**Bot Stats**
<:blank:676216695375003650>🔩 **Total Shards:** {{ .Shards }}
<:blank:676216695375003650>⚙️ **Revision:** {{ .GitCommit }} ({{ .GitBranch }})
<:blank:676216695375003650>⏰ **Built at** {{ .BuildDate }}
`,
		),
	)
)

type MentionResponseData struct {
	AppURL  string
	GuildID string
}

type RootStatsData struct {
	Users     int
	Guilds    int
	Roles     int
	Shards    int
	GitCommit string
	GitBranch string
	BuildDate string
}
