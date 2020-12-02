package common

import (
	"encoding/json"
	"os"
	"strconv"
	"strings"
)

// GetenvValue is a holder type for Getenv to translate any Getenv strings to real types
type GetenvValue struct {
	key   string
	value string
}

func Getenv(key string, defaultValue ...string) GetenvValue {
	value := ""
	if len(defaultValue) > 0 {
		value = defaultValue[0]
	}

	envValue := os.Getenv(key)
	if envValue != "" {
		value = envValue
	}

	return GetenvValue{
		value: strings.TrimSpace(value),
		key:   key,
	}
}

func (g GetenvValue) String() string {
	return g.value
}

func (g GetenvValue) StringSlice(optionalDelimiter ...string) []string {
	delimiter := ","
	if len(optionalDelimiter) > 0 {
		delimiter = optionalDelimiter[0]
	}

	return strings.Split(g.value, delimiter)
}

// SafeURL removes any trailing slash
func (g GetenvValue) SafeURL() string {
	if g.value[len(g.value)-1] == '/' {
		return g.value[:len(g.value)-1]
	}

	return g.value
}

func (g GetenvValue) Bool() bool {
	lowercaseValue := strings.ToLower(g.value)
	if g.value == "1" || lowercaseValue == "true" || lowercaseValue == "yes" {
		return true
	} else {
		return false
	}
}

func (g GetenvValue) Number() int {
	result, err := strconv.Atoi(g.value)

	if err != nil {
		return -999999
	}

	return result
}

func (g GetenvValue) JSON(target interface{}) error {
	return json.Unmarshal([]byte(g.value), target)
}

func (g GetenvValue) OrFatal() GetenvValue {
	if g.value == "" {
		panic("Getenv value was empty and shouldn't be. key: " + g.key)
	}

	return g
}
