package types

import "time"

// CreateSessionRequest is the payload to /create-session
type CreateSessionRequest struct {
	AccessTokenResponse AccessTokenResponse
	Fingerprint         Fingerprint
}

type Fingerprint struct {
	UserAgent    string
	ClientIP     string
	ForwardedFor string
}

type CreateSessionResponse struct {
	SessionID string
}

type SessionData struct {
	SessionID    string
	Fingerprint  Fingerprint
	AccessTokens AccessTokenResponse
	UserData     UserData
}

type UserData struct {
	DataExpires time.Time
	UserID      string
}
