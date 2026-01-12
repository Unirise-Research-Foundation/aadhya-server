import { MigrationInterface, QueryRunner } from 'typeorm';

export class SplitPersonsTable1765715888928 implements MigrationInterface {
  name = 'SplitPersonsTable1765715888928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the new tables
    await queryRunner.query(
      `CREATE TABLE "intelligences" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" uuid NOT NULL, "data" jsonb, CONSTRAINT "UQ_c3fffadcbb27064396e7b484ef2" UNIQUE ("personId"), CONSTRAINT "REL_c3fffadcbb27064396e7b484ef" UNIQUE ("personId"), CONSTRAINT "PK_bbf27a22f8f6bcc4ddf538f3d98" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "personality" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" uuid NOT NULL, "data" jsonb, CONSTRAINT "UQ_2ade54368cd3a74c5e20684edce" UNIQUE ("personId"), CONSTRAINT "REL_2ade54368cd3a74c5e20684edc" UNIQUE ("personId"), CONSTRAINT "PK_97c40c392c5c1660fe601a376d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "physical" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" uuid NOT NULL, "data" jsonb, CONSTRAINT "UQ_ce44dbf9e48037673f44b414fb3" UNIQUE ("personId"), CONSTRAINT "REL_ce44dbf9e48037673f44b414fb" UNIQUE ("personId"), CONSTRAINT "PK_edc1029cb758be3b5f6c286ee02" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "financial" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" uuid NOT NULL, "data" jsonb, CONSTRAINT "UQ_d49df0ddeef41405ef9a719f14f" UNIQUE ("personId"), CONSTRAINT "REL_d49df0ddeef41405ef9a719f14" UNIQUE ("personId"), CONSTRAINT "PK_9095bd42e3bb76c634d7561eb45" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "people" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" uuid NOT NULL, "data" jsonb, CONSTRAINT "UQ_97cfa7b6e5e4a55a5b417f0bfcb" UNIQUE ("personId"), CONSTRAINT "REL_97cfa7b6e5e4a55a5b417f0bfc" UNIQUE ("personId"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`,
    );

    // Add foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "intelligences" ADD CONSTRAINT "FK_c3fffadcbb27064396e7b484ef2" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "personality" ADD CONSTRAINT "FK_2ade54368cd3a74c5e20684edce" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "physical" ADD CONSTRAINT "FK_ce44dbf9e48037673f44b414fb3" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial" ADD CONSTRAINT "FK_d49df0ddeef41405ef9a719f14f" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" ADD CONSTRAINT "FK_97cfa7b6e5e4a55a5b417f0bfcb" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    // Migrate data from person table JSONB columns to new tables
    await queryRunner.query(`
            INSERT INTO "intelligences" ("personId", "data", "createdAt", "updatedAt", "deletedAt")
            SELECT "id", "intelligences", "createdAt", "updatedAt", "deletedAt"
            FROM "person"
            WHERE "intelligences" IS NOT NULL
        `);

    await queryRunner.query(`
            INSERT INTO "personality" ("personId", "data", "createdAt", "updatedAt", "deletedAt")
            SELECT "id", "personality", "createdAt", "updatedAt", "deletedAt"
            FROM "person"
            WHERE "personality" IS NOT NULL
        `);

    await queryRunner.query(`
            INSERT INTO "physical" ("personId", "data", "createdAt", "updatedAt", "deletedAt")
            SELECT "id", "physical", "createdAt", "updatedAt", "deletedAt"
            FROM "person"
            WHERE "physical" IS NOT NULL
        `);

    await queryRunner.query(`
            INSERT INTO "financial" ("personId", "data", "createdAt", "updatedAt", "deletedAt")
            SELECT "id", "financial", "createdAt", "updatedAt", "deletedAt"
            FROM "person"
            WHERE "financial" IS NOT NULL
        `);

    await queryRunner.query(`
            INSERT INTO "people" ("personId", "data", "createdAt", "updatedAt", "deletedAt")
            SELECT "id", "people", "createdAt", "updatedAt", "deletedAt"
            FROM "person"
            WHERE "people" IS NOT NULL
        `);

    // Drop JSONB columns from person table
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "intelligences"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "personality"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "physical"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "financial"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "people"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add JSONB columns back to person table
    await queryRunner.query(`ALTER TABLE "person" ADD "people" jsonb`);
    await queryRunner.query(`ALTER TABLE "person" ADD "financial" jsonb`);
    await queryRunner.query(`ALTER TABLE "person" ADD "physical" jsonb`);
    await queryRunner.query(`ALTER TABLE "person" ADD "personality" jsonb`);
    await queryRunner.query(`ALTER TABLE "person" ADD "intelligences" jsonb`);

    // Migrate data back from new tables to person table
    await queryRunner.query(`
            UPDATE "person" p
            SET "intelligences" = i."data"
            FROM "intelligences" i
            WHERE p."id" = i."personId"
        `);

    await queryRunner.query(`
            UPDATE "person" p
            SET "personality" = pr."data"
            FROM "personality" pr
            WHERE p."id" = pr."personId"
        `);

    await queryRunner.query(`
            UPDATE "person" p
            SET "physical" = ph."data"
            FROM "physical" ph
            WHERE p."id" = ph."personId"
        `);

    await queryRunner.query(`
            UPDATE "person" p
            SET "financial" = f."data"
            FROM "financial" f
            WHERE p."id" = f."personId"
        `);

    await queryRunner.query(`
            UPDATE "person" p
            SET "people" = pe."data"
            FROM "people" pe
            WHERE p."id" = pe."personId"
        `);

    // Drop foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "people" DROP CONSTRAINT "FK_97cfa7b6e5e4a55a5b417f0bfcb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial" DROP CONSTRAINT "FK_d49df0ddeef41405ef9a719f14f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "physical" DROP CONSTRAINT "FK_ce44dbf9e48037673f44b414fb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "personality" DROP CONSTRAINT "FK_2ade54368cd3a74c5e20684edce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intelligences" DROP CONSTRAINT "FK_c3fffadcbb27064396e7b484ef2"`,
    );

    // Drop the new tables
    await queryRunner.query(`DROP TABLE "people"`);
    await queryRunner.query(`DROP TABLE "financial"`);
    await queryRunner.query(`DROP TABLE "physical"`);
    await queryRunner.query(`DROP TABLE "personality"`);
    await queryRunner.query(`DROP TABLE "intelligences"`);
  }
}
