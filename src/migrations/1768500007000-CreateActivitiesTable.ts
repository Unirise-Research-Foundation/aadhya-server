import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateActivitiesTable1768500007000 implements MigrationInterface {
  name = 'CreateActivitiesTable1768500007000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activities" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "assessmentId" uuid NOT NULL,
        "type" character varying NOT NULL,
        "domain" character varying NOT NULL,
        "attribute" character varying,
        "metadata" jsonb,
        CONSTRAINT "PK_activities_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "activities" ADD CONSTRAINT "FK_activities_assessmentId" 
       FOREIGN KEY ("assessmentId") REFERENCES "assessments"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_activities_assessmentId" ON "activities" ("assessmentId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_activities_assessmentId"`);
    await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_activities_assessmentId"`);
    await queryRunner.query(`DROP TABLE "activities"`);
  }
}

