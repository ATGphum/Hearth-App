#!/bin/bash

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate