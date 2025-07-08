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

##  Child Module Setup

This section documents the steps to create the `Child` module with entity, service, and controller using NestJS CLI and TypeORM.

---

#### 📦 1. Generate Child Module, Controller, and Service

```bash
nest generate module child
nest generate service child
nest generate controller child
```

This creates:

```
src/
  child/
    child.module.ts
    child.service.ts
    child.controller.ts
```

---

#### 🧱 2. Create CommonEntity Base Class

Create a reusable base entity to track creation, update, and soft-delete timestamps.

> 📄 File: `src/common/entities/common.entity.ts`

```ts
export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
```

---

#### 3. Define Child Entity

> 📄 File: `src/child/entities/child.entity.ts`

```ts
@Entity()
export class Child extends CommonEntity {
  @Column()
  name: string;

  @Column()
  yob: number; // year of birth
}
```

---

✅ Now you have:
- A `Child` module with service and controller scaffolded
- A reusable `CommonEntity` for consistent timestamps
- `Child` entity set up for future API and database work


## Adding the module to TypeORM and creating migrations
- There are 2 ways to do this in the `typeorm.config.ts` we can individually add the entities or provide the folder path

1. Individual entites
``` ts
const typeormConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  // ✅ Register entity here
  entities: [Child],
  migrations: ['dist/migrations/*{.ts,.js}'],
  
  autoLoadEntities: true,
  synchronize: false,
};
```

2. Providing folder path
``` ts
const typeormConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  // ✅ Register entity here
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],

  autoLoadEntities: true,
  synchronize: false,
};
```

## Migrations
#### Added migration related scripts to `package.json`

#### Generate a migration
This will create a migration file based on your entity changes.

> Make sure when running locally change the DB_PASSWORD to your local database password and host to localhost in .env file 

#### Locally:
```bash
npm run migration:generate --name=CreateChildTable
```

```bash
docker compose exec api npm migration:generate --name=CreateChildTable
```

Make sure `package.json` contains:
```json
"migration:generate": "npm run typeorm -- -d ./src/typeorm.config.ts migration:generate src/migrations/$npm_config_name"
```

#### Run the migration
This will apply all pending migrations to the Docker database.


#### Locally:
```bash
npm run migration:run
```

```bash
docker compose exec api npm migration:run
```

Make sure `package.json` contains:
```json
"migration:run": "npm run typeorm migration:run -- -d ./src/typeorm.config.ts"
```

#### Summary
| Action               | Effect                                                                             |
| -------------------- | ---------------------------------------------------------------------------------- |
| `docker compose up`  | Starts containers, creates DB, but doesn't create tables unless migrations are run |
| `migration:generate` | Compares entity files with DB, creates `.ts` file with SQL changes                 |
| `migration:run`      | Executes migration SQL against the DB, creates tables                              |


#### Reverting a Migration (Rollback)

If you need to roll back the most recent migration:

#### Locally:
```bash
npm run migration:revert
```

#### Inside Docker container:
```bash
docker compose exec api npm run migration:revert
```

Make sure `package.json` contains:
```json
"migration:revert": "npm run typeorm -- -d ./src/typeorm.config.ts migration:revert"
```

> This will undo the last executed migration using the `down()` method defined in the migration file.