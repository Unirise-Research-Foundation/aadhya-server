# Aadhya Server (NGO Backend)

This is the backend service for the Aadhya NGO project, built using [NestJS](https://nestjs.com/), Docker, and [Doppler](https://doppler.com/) for secure environment variable management.

---

## Project Setup

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Doppler CLI](https://docs.doppler.com/docs/install-cli) (for environment variable management)

### Environment Configuration with Doppler

#### 1. Install Doppler CLI

```bash
# macOS
brew install dopplerhq/cli/doppler

# Linux/Windows - see https://docs.doppler.com/docs/install-cli
```

#### 2. Setup Doppler with provided token

```bash
# Navigate to project directory
cd aadhya-server

# Setup Doppler with the provided local token
doppler setup --token=[token] --no-interactive
```

### Local Development

#### Option 1: With Doppler (Recommended)

```bash
# Install dependencies
pnpm install

# Run with Doppler (automatically injects environment variables)
doppler run -- pnpm start:dev
```

#### Option 2: Without Doppler (Fallback)

```bash
# Copy environment template (if available)
cp .env.template .env

# Edit .env file with your values, then run:
pnpm start:dev
```

The server will be available at: [http://localhost:3001](http://localhost:3001)

---

### Docker Development

#### Option 1: With Doppler (Recommended)

```bash
# Run with Doppler
doppler run -- docker compose up --build
```

#### Option 2: Standard Docker (uses .env file or defaults)

```bash
# Build and start the container
docker compose up --build

# Or run as background service
docker compose up -d --build
```

#### Stop containers

```bash
docker compose down
```

Both options will make the server available at: [http://localhost:3001](http://localhost:3001)

---

## Doppler Commands

### Useful Doppler Commands

```bash
# View all environment variables
doppler secrets

# Get a specific environment variable
doppler secrets get DATABASE_PASSWORD

# Run any command with Doppler environment
doppler run -- [your-command]

# Download all secrets to a file (for backup/reference)
doppler secrets download --no-file --format env

# Check current Doppler configuration
doppler configure
```

### Available Scripts with Doppler

```bash
# Development
doppler run -- pnpm start:dev

# Production
doppler run -- pnpm start:prod

# Debug mode
doppler run -- pnpm start:debug

# Run migrations
doppler run -- pnpm migration:run

# Docker with Doppler
doppler run -- docker compose up --build
```


---

## Health Check

A simple endpoint is available to verify that the server is running:

```
GET /health
```

Example usage:

```bash
curl http://localhost:3000/health
```

Response:
```
ok
```

---

## Project Structure

```
src/
  ├── app.controller.ts   # Base and health endpoints
  ├── app.service.ts      # Application service
  └── app.module.ts       # Root module
```

---

## Tech Stack

- Node.js / NestJS
- pnpm (fast dependency management)
- Docker & Docker Compose


---

## Note for Linux Users

If you're running the app in Docker and then switching to local development using `pnpm start:dev`, you may run into permission issues like:

```
EACCES: permission denied, unlink 'dist/...'
```

This happens because the `dist/` folder is created by Docker as root.

### To fix:

```bash
sudo rm -rf dist
```

Then try running the app again:

```bash
pnpm start:dev
```
