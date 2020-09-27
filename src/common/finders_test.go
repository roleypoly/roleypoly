package common_test

import (
	"testing"

	"github.com/roleypoly/roleypoly/src/common"
)

func TestFindString(t *testing.T) {
	if !common.FindString("hello", []string{"hello", "world"}) {
		t.FailNow()
	}

	if common.FindString("foo", []string{"a", "b", "c"}) {
		t.FailNow()
	}
}
