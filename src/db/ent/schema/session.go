package schema

import (
	"time"

	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/field"
	"github.com/facebook/ent/schema/mixin"
)

// Session holds the schema definition for the Session entity.
type Session struct {
	ent.Schema
}

// Fields of the Session.
func (Session) Fields() []ent.Field {
	return []ent.Field{
		field.Text("session_id").
			Immutable().Unique(),

		field.Text("user_id").
			Immutable().Unique(),

		field.Enum("source").
			Values("oauth", "dm").
			Immutable(),

		field.Time("expires_at").
			Immutable().
			Default(func() time.Time {
				return time.Now().Add(6 * time.Hour)
			}),
	}
}

// Edges of the Session.
func (Session) Edges() []ent.Edge {
	return nil
}

// Mixin of the Session.
func (Session) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
