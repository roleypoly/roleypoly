package version

import (
	"fmt"
)

var (
	GitCommit = "unknown"
	GitBranch = "unknown"
	BuildDate = "unknown"
)

func StartupInfo(serviceName string) string {
	return fmt.Sprintf(
		"Starting %s service.\n Build %s (%s) at %s",
		serviceName,
		GitCommit,
		GitBranch,
		BuildDate,
	)
}
