package version

import (
	"testing"
	"time"
)

func TestStartup(t *testing.T) {
	GitBranch = "test"
	GitCommit = "e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e"
	BuildDate = time.Now().UTC().Format("2006-01-02T15:04:05.000Z")

	expected := "Starting test service.\n Build e5fa44f2b31c1fb553b6021e7360d07d5d91ff5e (test) at " + BuildDate
	value := StartupInfo("test")
	if value != expected {
		t.Error("Incorrect render, got `", value, "`")
	}
}
