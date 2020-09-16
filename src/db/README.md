# DB

Roleypoly's DB schemas, connectors, and other useful database admin tools. 

## Tools

### ent

ent schema and the files it generates. 

Edit nothing outside of the `schemas` folder, as all others are generated.

When done editing, do `go generate ./ent` to update generation.

*Failing to generate files will make CI fail.*

All schemas must be backwards compatible with previous versions of this library, and be compatible with **CockroachDB**-based Postgres.