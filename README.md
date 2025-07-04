# Aadhya Server (NGO Backend)

This is the backend service for the Aadhya NGO project, built using [NestJS](https://nestjs.com/) and Docker.

---

## 🚀 Project Setup

### 🔧 Local Development

#### 1. Install dependencies

```bash
pnpm install
```

#### 2. Run the app locally

```bash
pnpm start:dev
```

The server will be available at: [http://localhost:3000](http://localhost:3000)

---

### 🐳 Run with Docker

#### 1. Build and start the container

```bash
docker compose up --build
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🩺 Health Check

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

## 🗂 Project Structure

```
src/
  ├── app.controller.ts   # Base and health endpoints
  ├── app.service.ts      # Application service
  └── app.module.ts       # Root module
```

---

## 📦 Tech Stack

- Node.js / NestJS
- pnpm (fast dependency management)
- Docker & Docker Compose


---

## 🐧 Note for Linux Users

If you're running the app in Docker and then switching to local development using `pnpm start:dev`, you may run into permission issues like:

```
EACCES: permission denied, unlink 'dist/...'
```

This happens because the `dist/` folder is created by Docker as root.

### 🔧 To fix:

```bash
sudo rm -rf dist
```

Then try running the app again:

```bash
pnpm start:dev
```



## Setup: TypeORM, Global Interceptor, and Exception Filter

### 1. TypeORM Configuration (with `.env`)

#### Installed Packages:
```bash
pnpm add @nestjs/typeorm typeorm pg
```

#### Created `src/typeorm.config.ts`:

#### Injected TypeORM in `AppModule`:
```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

---

### 2. ⚙️ Added Global Response Interceptor

#### Created `src/common/interceptors/response.interceptor.ts`:
#### Registered in `AppModule`:
```ts
providers: [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
]
```



---

### 3. 🛡️ Added Global Exception Filter

#### Created `src/common/filters/global-exception.filter.ts`:

#### Registered in `AppModule`:
```ts
providers: [
  {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },
]
```

---
