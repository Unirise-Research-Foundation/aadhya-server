import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePersonTable1768500000000 implements MigrationInterface {
  name = 'CreatePersonTable1768500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "person" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "yob" integer NOT NULL,
        "username" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" character varying(100) NOT NULL,
        CONSTRAINT "UQ_person_username" UNIQUE ("username"),
        CONSTRAINT "PK_person_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "person"`);
  }
}

