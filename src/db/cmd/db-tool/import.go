package main

import (
	"context"
	"database/sql"
	"log"
	"os"
	"time"

	ent "github.com/roleypoly/db/ent"
	"github.com/roleypoly/db/ent/schema"
)

type v1Category struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	Roles    []string `json:"roles"`
	Hidden   bool     `json:"hidden"`
	Type     string   `json:"type"`
	Position int      `json:"position"`
}

type v1Server struct {
	ID         string       `json:"id"`
	Categories []v1Category `json:"categories"`
	Message    string       `json:"message"`
	CreatedAt  time.Time    `json:"created_at"`
	UpdatedAt  time.Time    `json:"updated_at"`
}

func fromCategories(cats []v1Category) []schema.Category {
	out := make([]schema.Category, len(cats))
	for i, cat := range cats {
		out[i] = schema.Category{
			ID:       cat.ID,
			Name:     cat.Name,
			Hidden:   cat.Hidden,
			Type:     cat.Type,
			Position: cat.Position,
			Roles:    cat.Roles,
		}
	}

	return out
}

func runImport(newDB *ent.Client, oldDB *sql.DB) {
	ctx := ent.NewContext(context.Background(), newDB)
	tx, err := newDB.Tx(ctx)

	oldServers, err := oldDB.Query(`SELECT * FROM servers`)
	if err != nil {
		tx.Rollback()
		log.Fatalln("query error", err)
	}

	defer oldServers.Close()

	for oldServers.Next() == true {
		var data v1Server

		log.Printf("importing %s\n", data.ID)

		err = oldServers.Scan(&data)
		if err != nil {
			tx.Rollback()
			log.Fatalln("data scan error", err)
		}

		guild := tx.Guild.Create()

		guild.SetMessage(data.Message).
			SetSnowflake(data.ID).
			SetCategories(fromCategories(data.Categories)).
			SetCreateTime(data.CreatedAt)

		ctx := ent.NewContext(context.Background(), newDB)
		guild.SaveX(ctx)
	}

	err = tx.Commit()
	if err != nil {
		log.Fatalln("tx commit error", err)
	}
}

func importFromV1() {
	log.Println("Import from V1 starting.")

	client, err := ent.Open("postgres", os.Getenv("DB_URL"))
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	oldClient, err := sql.Open("postgres", os.Getenv("OLD_DB_URL"))
	if err != nil {
		log.Fatalln(err)
	}
	defer oldClient.Close()

	runImport(client, oldClient)
	log.Println("Import from V1 finished.")
}
