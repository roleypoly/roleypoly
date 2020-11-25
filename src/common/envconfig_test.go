package common_test

import (
	"os"
	"testing"

	"github.com/onsi/gomega"
	"github.com/roleypoly/roleypoly/src/common"
)

var (
	testEnv = map[string]string{
		"string":          "hello world",
		"slice":           "hello,world",
		"slice_no_delim":  "hello world",
		"slice_set_delim": "hello|world",
		"number":          "10005",
		"number_bad":      "abc123",
		"bool":            "true",
		"bool_bad":        "truth",
		"bool_no":         "false",
		"bool_number":     "1",
		"json":            `{"hello":"world","arr":[1,2,3]}`,
	}
)

func TestMain(m *testing.M) {

	for key, value := range testEnv {
		os.Setenv("test__"+key, value)
	}

	m.Run()
}

func TestEnvconfigString(t *testing.T) {
	testStr := common.Getenv("test__string").String()
	if testStr != testEnv["string"] {
		t.FailNow()
	}
}

func TestEnvconfigStringSlice(t *testing.T) {
	testSl := common.Getenv("test__slice").StringSlice()
	if testSl[0] != "hello" || testSl[1] != "world" {
		t.FailNow()
	}
}

func TestEnvconfigStringSliceNoDelimeter(t *testing.T) {
	testSl := common.Getenv("test__slice_no_delim").StringSlice()
	if testSl[0] != testEnv["slice_no_delim"] {
		t.FailNow()
	}
}

func TestEnvconfigStringSliceSetDelimeter(t *testing.T) {
	testSl := common.Getenv("test__slice_set_delim").StringSlice("|")
	if testSl[0] != "hello" || testSl[1] != "world" {
		t.FailNow()
	}
}

func TestEnvconfigNumber(t *testing.T) {
	testNum := common.Getenv("test__number").Number()
	if testNum != 10005 {
		t.FailNow()
	}
}

func TestEnvconfigNumberBad(t *testing.T) {
	testNum := common.Getenv("test__number_bad").Number()
	if testNum != -999999 {
		t.FailNow()
	}
}

func TestEnvconfigBool(t *testing.T) {
	testBool := common.Getenv("test__bool").Bool()
	if !testBool {
		t.FailNow()
	}
}

func TestEnvconfigBoolBad(t *testing.T) {
	testBool := common.Getenv("test__bool_bad").Bool()
	if testBool {
		t.FailNow()
	}
}

func TestEnvconfigBoolFalse(t *testing.T) {
	testBool := common.Getenv("test__bool_no").Bool()
	if testBool {
		t.FailNow()
	}
}

func TestEnvconfigBoolNumber(t *testing.T) {
	testBool := common.Getenv("test__bool_number").Bool()
	if !testBool {
		t.FailNow()
	}
}

func TestEnvconfigDefault(t *testing.T) {
	testBool := common.Getenv("test__thing_that_doesnt_exist", "yes").Bool()
	if !testBool {
		t.FailNow()
	}
}

type testJSONData struct {
	Hello string `json:"hello,omitempty"`
	Arr   []int  `json:"arr,omitempty"`
}

func TestEnvconfigJSON(t *testing.T) {
	data := testJSONData{}
	err := common.Getenv("test__json").JSON(&data)
	if err != nil || data.Hello != "world" || len(data.Arr) != 3 {
		t.FailNow()
	}
}

func TestEnvconfigFatal(t *testing.T) {
	O := gomega.NewWithT(t)
	O.Expect(func() {
		_ = common.Getenv("test__thing_that_doesnt_exist").OrFatal().String()
	}).Should(gomega.Panic(), "Getenv without a value should panic")
}

func TestEnvconfigNotFatal(t *testing.T) {
	O := gomega.NewWithT(t)
	O.Expect(func() {
		_ = common.Getenv("test__string").OrFatal().String()
	}).ShouldNot(gomega.Panic(), "Getenv with a value should not panic")
}
