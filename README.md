# Hearth App

## Tech stack

**Frontend**: React, Typescript, Chakra

**Backend** : Fastify, Typescript, Prisma

**DB**: Postgres

## Workflow Status

**Frontend:** [![Deploy Frontend to Heroku](https://github.com/ATGphum/Hearth-App/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/ATGphum/Hearth-App/actions/workflows/frontend-ci.yml)

**Backend:** [![Deploy Backend to Heroku](https://github.com/ATGphum/Hearth-App/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/ATGphum/Hearth-App/actions/workflows/backend-ci.yml)

## Getting started

### Requirements

- Npm
- NodeJS (Tested on v20)
- Docker

### Recommended vscode extensions

- Prettier
- ESLint
- Prisma

### Running api and db

run

`docker compose up`

This will spin up the backend and the database. Whenever you:

- install a new node package
- update an environment variable

you will need to run the following command to trigger an image rebuild on launch

`docker compose up --build`

#### Debugging api

Server can be debugged by pressing the play button in vscode to attach the debugger to the running server docker container

### Running web app

Ensure your terminal is in the `hearth-web` directory, then run:

`npm run dev`

This will spin up the frontend. Whenever you:

- install a new node package
- install dependencies that were added but not yet to local

you will need to run the following command:

`npm install`

If you want to test building a production build run:

`npm run build`

You will see a `dist` folder in the hearth-web directory.

### Viewing the db

from the `hearth-api` directory, run

`npx prisma studio`

This will spin up a GUI to view the database. Don't run the command from the root directory, and don't install if prompted!

### Applying migrations

from the `hearth-api` directory, run

npx prisma migrate dev

### Gotchas

- if your code isnt formatting via prettier when saving locally, install prettier vs code extension and go to your settings.json for your vscode and add the following configuration

```
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

- Skip Type checking of third party node libraries by adding `"skipLibCheck": true` to tsconfig.json
- There is an issue with the server debugger disconnecting whenever a change is made to typescript code
- If your auth0 session keeps disconnecting, you may need to turn off your browser ad blocker
