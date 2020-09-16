package schema

import (
	"time"

	"github.com/facebook/ent"
	"github.com/facebook/ent/schema/field"
	"github.com/facebook/ent/schema/mixin"
)

// Challenge holds the schema definition for the Challenge entity.
type Challenge struct {
	ent.Schema
}

// Fields of the Challenge.
func (Challenge) Fields() []ent.Field {
	return []ent.Field{
		field.Text("challenge_id").
			Immutable().Unique(),

		field.Text("user_id").
			Immutable().Unique(),

		field.String("human").Immutable().Unique(),
		field.String("magic").Immutable().Unique(),

		field.Time("expires_at").
			Immutable().
			Default(func() time.Time {
				return time.Now().Add(5 * time.Minute)
			}),
	}
}

// Edges of the Challenge.
func (Challenge) Edges() []ent.Edge {
	return nil
}

// Mixin of the Challenge.
func (Challenge) Mixin() []ent.Mixin {
	return []ent.Mixin{
		mixin.Time{},
	}
}
