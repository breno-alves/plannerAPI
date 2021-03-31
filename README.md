# Planner API

Planner's API

## Version

    Node.js v14.15.1

## Install dependecies

    yarn

## Run Api in development

    yarn dev:server

## Run migrations

    yarn typeorm migrations:run

---

## Env

Example of envirioment values

```
APP_SECRET=a83920d1348eee579e4d5e2037b93657
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=db_planner
# TYPEORM_HOST=localhost (if database is running on localhost)
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=postgres
TYPEORM_DATABASE=planner_db
TYPEORM_PORT=5432
TYPEORM_SYNCHRONIZE=false
TYPEORM_DROP_SCHEMA=false
TYPEORM_LOGGING=all
TYPEORM_ENTITIES=./src/modules/*/infra/typeorm/entities/*.ts
TYPEORM_MIGRATIONS=./src/shared/infra/typeorm/migrations/*.ts
TYPEORM_MIGRATIONS_DIR=./src/shared/infra/typeorm/migrations/
```

## Docker

Docker-compose file contains three containers:

- Api container
- Main database
- Tests database

### Runnning docker-compose

    docker-compose up -d
