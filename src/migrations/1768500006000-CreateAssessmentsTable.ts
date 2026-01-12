import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssessmentsTable1768500006000 implements MigrationInterface {
  name = 'CreateAssessmentsTable1768500006000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "assessments" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" text NOT NULL,
        "introduction" text NOT NULL,
        "conclusion" text NOT NULL,
        CONSTRAINT "PK_assessments_id" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "assessments"`);
  }
}

