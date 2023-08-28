# Hearth App

## Tech stack

**Frontend**: React, Typescript, Chakra

**Backend** : Fastify, Typescript, Drizzle

**DB**: Postgres

## Getting started

### Requirements

- Npm
- NodeJS (Tested on v20)
- Docker

### Recommended vscode extensions

- Prettier
- ESLint

### Running api and db

run

`docker-compose up`

This will spin up the backend and the database. Whenever you

- install a new node package
- update an environment variable
  you will need to run the following command to rebuild the image

`docker-compose up --build -d`

### Gotchas

- if your code isnt formatting via prettier when saving locally, install prettier vs code extension and go to your settings.json for your vscode and add the following configuration

```
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

- Skip Type checking of third party node libraries by adding `"skipLibCheck": true` to tsconfig.json
