package main

import (
	"context"
	"log"
	"os"
	"time"

	_ "github.com/lib/pq"
	ent "github.com/roleypoly/db/ent"
	"github.com/roleypoly/db/ent/migrate"
)

func retryMigrate(client *ent.Client) {
	for i := 0; i < 10; i++ {
		err := client.Schema.Create(context.Background(), migrate.WithGlobalUniqueID(true))
		if err == nil {
			return
		}

		log.Println("Migration failed --", err)
		time.Sleep(2 * time.Second)
	}

	log.Fatalln("Migration failed after 20 seconds.")
	return
}

func doMigrate() {
	log.Println("Migrations starting.")

	client, err := ent.Open("postgres", os.Getenv("DB_URL"))
	if err != nil {
		log.Fatalln(err)
	}

	defer client.Close()

	retryMigrate(client)
	log.Println("Migrations finished.")
}

func main() {
	tool := os.Args[1]
	if tool == "" {
		tool = "migrate"
	}

	switch tool {
	case "migrate":
		doMigrate()
	case "import":
		importFromV1()
	default:
		log.Fatalln("supported tools: migrate, import")
	}

}
