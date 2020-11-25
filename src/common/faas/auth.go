package faas

import (
	"errors"
	"net/http"
)

type AuthLevel uint

const (
	AuthGuest = AuthLevel(iota)
	AuthUser
	AuthAdmin
	AuthSuper
)

var (
	ErrNotAuthorized = errors.New("common/faas: session not authorized")
)

func assertAuthLevel(err error, requiredAuthLevel AuthLevel, assertedAuthLevel AuthLevel) error {
	if requiredAuthLevel == assertedAuthLevel {
		return nil
	} else {
		return err
	}
}

// AuthMustMatch will assert the current session's authorization group/level; only can match for Guest, User, and Super.
func AuthMustMatch(request *http.Request, authLevel AuthLevel) error {
	_, err := request.Cookie("Authorization")
	if errors.Is(err, http.ErrNoCookie) {
		// No cookie is present, assert guest.
		return assertAuthLevel(ErrNotAuthorized, authLevel, AuthGuest)
	} else if err != nil {
		return err
	}

	return nil
}
