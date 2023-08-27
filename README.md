# Hearth App

## Tech stack

**Frontend**: React, Typescript, Chakra

**Backend** : Fastify, Typescript, Prism

**DB**: Postgres

## Getting started

### Requirements

- Yarn 1.22
- NodeJS (Mine is v20)
- Docker

### Running locally

run

`docker-compose up`

This will spin up the backend and the server. Whenever you install a new node package, you will need to run the following command to rebuild the image

`docker-compose up --build -d`

### Gotchas

- if your code isnt formatting via prettier when saving locally, go to your settings.json for your vscode and add the following configuration

```
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
