# Aadhya Server (NGO Backend)

This is the backend service for the Aadhya NGO project, built using
**NestJS**, **TypeScript**, **PostgreSQL**, **TypeORM**, **Docker**,
**Docker Compose**, **pnpm**, and optional **Doppler** environment
management.

The server exposes the REST APIs used by the Aadhya Web application.

------------------------------------------------------------------------

## Table of Contents

-   [Project Overview](#project-overview)
-   [Prerequisites](#prerequisites)
-   [Repository Setup](#repository-setup)
-   [Environment Configuration](#environment-configuration)
-   [Local Development Setup](#local-development-setup)
-   [Database Setup](#database-setup)
-   [Run Migrations](#run-migrations)
-   [Start the Backend](#start-the-backend)
-   [API and Health Checks](#api-and-health-checks)
-   [Frontend Connection](#frontend-connection)
-   [Doppler Configuration](#doppler-configuration)
-   [Docker Development](#docker-development)
-   [Daily Startup](#daily-startup)
-   [Available Scripts](#available-scripts)
-   [Testing and Code Quality](#testing-and-code-quality)
-   [Troubleshooting](#troubleshooting)
-   [Project Structure](#project-structure)
-   [Tech Stack](#tech-stack)
-   [Quick Start](#quick-start)

------------------------------------------------------------------------

## Project Overview

Aadhya Server is the backend/API component of the Aadhya platform.

The recommended local development architecture is:

``` text
Aadhya Web
localhost:3000
      |
      | HTTP
      v
Aadhya Server
localhost:3001
      |
      | PostgreSQL
      v
PostgreSQL in Docker
localhost:5433
```

For the normal local workflow, PostgreSQL runs in Docker and the NestJS
application runs directly on the development machine.

------------------------------------------------------------------------

## Prerequisites

Install the following before setting up the project:

-   **Node.js 18+**
-   **pnpm**
-   **Docker Desktop**
-   **Docker Compose**
-   **Git**

**Doppler CLI** is optional for local development when using the `.env`
workflow, but is used by several project scripts for Doppler-managed
environments.

Docker Desktop must be running before starting the PostgreSQL container.

------------------------------------------------------------------------

## Repository Setup

### 1. Clone the development branch

``` bash
git clone -b develop https://github.com/Unirise-Research-Foundation/aadhya-server.git
cd aadhya-server
```

### 2. Update an existing checkout

``` bash
git checkout develop
git pull origin develop
```

### 3. Install dependencies

``` bash
pnpm install
```

To view all package scripts:

``` bash
pnpm run
```

------------------------------------------------------------------------

## Environment Configuration

The repository contains:

``` text
.env.template
```

Create a local `.env` file from the template.

### Windows PowerShell

``` powershell
Copy-Item .env.template .env
```

### macOS / Linux

``` bash
cp .env.template .env
```

The current `.env.template` contains:

``` env
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=aadhya_db
NODE_ENV=development
PORT=3001
```

The template also contains commented placeholders for optional values
such as:

``` env
# JWT_SECRET=your_jwt_secret_here
# API_KEY=your_api_key_here
```

Do not commit `.env`, real passwords, JWT secrets, API keys, or Doppler
tokens.

------------------------------------------------------------------------

# Local Development Setup

The following is the recommended setup for local development.

## Step 1 --- Start PostgreSQL

Make sure Docker Desktop is running.

From the `aadhya-server` directory:

``` bash
docker compose up localhost -d
```

The `localhost` Compose service is the PostgreSQL service.

Check running containers:

``` bash
docker ps
```

The database container is named:

``` text
aadhya-postgres
```

------------------------------------------------------------------------

## Step 2 --- Database Configuration

The current local Docker database configuration is:

``` text
Host:      localhost
Port:      5433
Database:  aadhya_db
Username:  postgres
Password:  postgres
```

The PostgreSQL container listens internally on port `5432` and Docker
exposes it on host port `5433`.

Therefore, the locally running NestJS application connects to:

``` text
localhost:5433
```

------------------------------------------------------------------------

## Step 3 --- Run Database Migrations

On the first setup, run:

``` bash
pnpm migration:run
```

This applies all pending TypeORM migrations.

The migrations create the database tables and include the project's
development seed data.

If you see:

``` text
No migrations are pending
```

the database is already up to date.

### Check migration status

``` bash
pnpm typeorm migration:show -d ./src/typeorm.config.ts
```

### When should migrations be run?

Run migrations:

-   During the first setup
-   After pulling changes that introduce new migrations
-   When the database schema needs to be updated

You do not need to run migrations every time the server starts.

------------------------------------------------------------------------

## Step 4 --- Start the Backend

For the normal local workflow:

``` bash
pnpm start:dev:local
```

This runs NestJS in watch mode without requiring Doppler.

The backend listens on:

``` text
http://localhost:3001
```

The global API prefix is:

``` text
/api
```

Therefore the local API base URL is:

``` text
http://localhost:3001/api
```

------------------------------------------------------------------------

# API and Health Checks

The server uses the following configuration:

``` text
Port:              3001
Global API Prefix: /api
URI Versioning:    Enabled
CORS:              Enabled
```

### Server root

``` text
GET http://localhost:3001/
```

### Health check

``` text
GET http://localhost:3001/api/health
```

Expected response:

``` text
ok
```

### Database check

The server also exposes:

``` text
GET http://localhost:3001/api/db-check
```

This endpoint checks whether the TypeORM data source is initialized.

### Command-line health check

``` bash
curl http://localhost:3001/api/health
```

Use the health endpoint before troubleshooting frontend API requests.

------------------------------------------------------------------------

# Frontend Connection

Aadhya Web uses the following local API base URL:

``` text
http://localhost:3001/api
```

Example versioned authentication route:

``` text
http://localhost:3001/api/v1/auth/login
```

The local application flow is:

``` text
Browser
   |
   | http://localhost:3000
   v
Aadhya Web
   |
   | http://localhost:3001/api
   v
Aadhya Server
   |
   | localhost:5433
   v
PostgreSQL
```

------------------------------------------------------------------------

# Doppler Configuration

Doppler can be used to provide environment variables securely.

## Install Doppler CLI

Install the Doppler CLI for your operating system using the official
Doppler documentation.

### macOS example

``` bash
brew install dopplerhq/cli/doppler
```

Linux and Windows installation instructions are available from Doppler.

## Configure Doppler

From the project directory:

``` bash
doppler setup --token=<YOUR_DOPPLER_TOKEN> --no-interactive
```

Do not commit or publish the token.

## Start the backend with Doppler

The `start:dev` script already invokes Doppler:

``` bash
pnpm start:dev
```

Alternatively, the equivalent command is:

``` bash
doppler run -- pnpm start:dev
```

## Start debug mode with Doppler

``` bash
pnpm start:debug
```

## Run migrations with Doppler

``` bash
pnpm migration:run:doppler
```

Equivalent direct command:

``` bash
doppler run -- pnpm migration:run
```

## Doppler secrets

``` bash
pnpm doppler:secrets
```

Equivalent command:

``` bash
doppler secrets
```

------------------------------------------------------------------------

# Docker Development

The repository contains Docker Compose configuration for both the API
and PostgreSQL services.

## Start the Docker Compose environment

``` bash
docker compose up --build
```

Or run it in the background:

``` bash
docker compose up -d --build
```

## Stop containers

``` bash
docker compose down
```

## View containers

``` bash
docker ps
```

## Backend logs

``` bash
docker logs -f unirise-aadhya-server
```

## PostgreSQL logs

``` bash
docker logs -f aadhya-postgres
```

### Important Docker note

For the standard local development workflow, use:

``` bash
docker compose up localhost -d
```

and run NestJS separately with:

``` bash
pnpm start:dev:local
```

This is the setup used for local development because the host-based
NestJS process connects to PostgreSQL through `localhost:5433`.

The repository also contains a separate database-only Compose file:

``` text
docker-compose.db.yml
```

which exposes PostgreSQL on host port `5433`.

------------------------------------------------------------------------

# Daily Startup

After the first setup, you normally do not need to reinstall
dependencies or rerun migrations unless changes require them.

### Terminal 1 --- PostgreSQL

``` bash
cd aadhya-server
docker compose up localhost -d
```

### Terminal 2 --- Backend

``` bash
cd aadhya-server
pnpm start:dev:local
```

Then start the frontend from the `aadhya-web` repository:

``` bash
cd aadhya-web
npm run dev
```

Open:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

# Available Scripts

These are the scripts currently defined in `package.json`.

### Application

``` bash
pnpm start
pnpm start:dev
pnpm start:dev:local
pnpm start:debug
pnpm start:debug:local
pnpm start:prod
pnpm start:prod:local
```

### Build

``` bash
pnpm build
```

### Formatting

``` bash
pnpm format
pnpm prettier:format
pnpm prettier:check
```

### Linting

``` bash
pnpm lint
pnpm lint:fix
```

### Tests

``` bash
pnpm test
pnpm test:watch
pnpm test:cov
pnpm test:debug
pnpm test:e2e
```

### TypeORM / Migrations

``` bash
pnpm typeorm
pnpm migration:run
pnpm migration:run:prod
pnpm migration:generate
pnpm migration:create
pnpm migration:revert
```

### Doppler

``` bash
pnpm migration:run:doppler
pnpm migration:generate:doppler
pnpm doppler:secrets
```

### Docker

``` bash
pnpm docker:dev
pnpm docker:dev:doppler
pnpm start:dev:docker
```

Run:

``` bash
pnpm run
```

to see the complete script list directly from the installed project.

------------------------------------------------------------------------

# Testing and Code Quality

### Run tests

``` bash
pnpm test
```

### Watch tests

``` bash
pnpm test:watch
```

### Test coverage

``` bash
pnpm test:cov
```

### End-to-end tests

``` bash
pnpm test:e2e
```

### Lint

``` bash
pnpm lint
```

### Automatically fix lint issues

``` bash
pnpm lint:fix
```

### Format source files

``` bash
pnpm format
```

### Check Prettier formatting

``` bash
pnpm prettier:check
```

------------------------------------------------------------------------

# Database and Migration Commands

### Run migrations

``` bash
pnpm migration:run
```

### Run production migrations

``` bash
pnpm migration:run:prod
```

### Show migration status

``` bash
pnpm typeorm migration:show -d ./src/typeorm.config.ts
```

### Create a migration

The repository defines:

``` text
migration:create
```

and migration generation is configured through the `migration:generate`
script.

For an actual migration name, use the project's configured TypeORM
command format rather than inventing a filename manually.

### Revert the latest migration

``` bash
pnpm migration:revert
```

Use migration rollback carefully.

------------------------------------------------------------------------

# Troubleshooting

## `relation "person" does not exist`

This normally means the database schema has not been migrated.

Start PostgreSQL:

``` bash
docker compose up localhost -d
```

Run:

``` bash
pnpm migration:run
```

Restart the backend:

``` bash
pnpm start:dev:local
```

------------------------------------------------------------------------

## `Doppler Error: you must provide a token`

If you are using the local `.env` workflow, do not start the backend
with the Doppler-wrapped script.

Use:

``` bash
docker compose up localhost -d
```

then:

``` bash
pnpm start:dev:local
```

If you want to use Doppler, configure a valid token and then use:

``` bash
pnpm start:dev
```

------------------------------------------------------------------------

## Database connection error

Check Docker:

``` bash
docker ps
```

Make sure `aadhya-postgres` is running.

Check `.env`:

``` text
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=aadhya_db
```

------------------------------------------------------------------------

## Frontend shows Network Error

First check:

``` text
http://localhost:3001/api/health
```

If it does not respond, start the backend:

``` bash
pnpm start:dev:local
```

Also make sure PostgreSQL is running:

``` bash
docker compose up localhost -d
```

------------------------------------------------------------------------

## Port 3001 is already in use

Windows PowerShell:

``` powershell
netstat -ano | findstr :3001
```

Identify and stop the process using the port if necessary.

------------------------------------------------------------------------

## Linux `EACCES` permission error

If Docker-created `dist` files cause a permission error such as:

``` text
EACCES: permission denied, unlink 'dist/...'
```

remove the generated directory:

``` bash
sudo rm -rf dist
```

Then restart:

``` bash
pnpm start:dev:local
```

------------------------------------------------------------------------

# Project Structure

The current repository structure is:

``` text
aadhya-server/
├── .github/
│   └── workflows/
├── docker/
├── src/
│   ├── activities/
│   ├── assessments/
│   ├── auth/
│   ├── common/
│   ├── constants/
│   ├── data/
│   ├── entities/
│   ├── migrations/
│   ├── person/
│   ├── responses/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   └── typeorm.config.ts
├── test/
├── .env.template
├── docker-compose.db.yml
├── docker-compose.yml
├── docker-entrypoint.sh
├── doppler.yaml
├── hash-password.js
├── local-development.md
├── local-setup.README.md
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── setup-gh-environments.sh
├── tsconfig.build.json
├── tsconfig.json
└── README.md
```

------------------------------------------------------------------------

# Tech Stack

-   Node.js
-   NestJS
-   TypeScript
-   PostgreSQL
-   TypeORM
-   pnpm
-   Docker
-   Docker Compose
-   Doppler
-   Jest
-   ESLint
-   Prettier

------------------------------------------------------------------------

# Quick Start

## First-time setup

``` bash
git clone -b develop https://github.com/Unirise-Research-Foundation/aadhya-server.git
cd aadhya-server
pnpm install
```

Create `.env`.

Windows PowerShell:

``` powershell
Copy-Item .env.template .env
```

macOS/Linux:

``` bash
cp .env.template .env
```

Start PostgreSQL:

``` bash
docker compose up localhost -d
```

Run migrations:

``` bash
pnpm migration:run
```

Start the backend:

``` bash
pnpm start:dev:local
```

Backend:

``` text
http://localhost:3001
```

API:

``` text
http://localhost:3001/api
```

Health:

``` text
http://localhost:3001/api/health
```

------------------------------------------------------------------------

# Important Notes

1.  The documented local development setup uses PostgreSQL in Docker and
    NestJS directly on the host.
2.  PostgreSQL is exposed on host port `5433`.
3.  NestJS listens on port `3001`.
4.  The global API prefix is `/api`.
5.  API versioning is enabled, so versioned routes can appear under
    `/api/v1/...`.
6.  Run migrations during the first setup.
7.  Run migrations again after pulling new migration files.
8.  Do not commit `.env` or secret values.
9.  Use `pnpm start:dev:local` when running the backend locally without
    Doppler.
10. Docker Compose also contains an API service, but the DB-only
    Docker + local NestJS workflow is the recommended local setup.
