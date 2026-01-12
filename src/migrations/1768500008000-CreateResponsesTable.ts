import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResponsesTable1768500008000 implements MigrationInterface {
  name = 'CreateResponsesTable1768500008000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "responses" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "personId" uuid NOT NULL,
        "activityId" uuid NOT NULL,
        "domain" character varying NOT NULL,
        "attribute" character varying NOT NULL,
        "responseData" jsonb,
        "previousScore" DECIMAL(10,2),
        "newScore" DECIMAL(10,2),
        "scoreChange" DECIMAL(10,2),
        "timeSpentSeconds" integer,
        "metadata" jsonb,
        CONSTRAINT "PK_responses_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_responses_personId" 
       FOREIGN KEY ("personId") REFERENCES "person"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_responses_activityId" 
       FOREIGN KEY ("activityId") REFERENCES "activities"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(`CREATE INDEX "IDX_responses_personId" ON "responses" ("personId")`);

    await queryRunner.query(
      `CREATE INDEX "IDX_responses_activityId" ON "responses" ("activityId")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_responses_personId_activityId" ON "responses" ("personId", "activityId")`,
    );

    await queryRunner.query(`CREATE INDEX "IDX_responses_createdAt" ON "responses" ("createdAt")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_responses_createdAt"`);
    await queryRunner.query(`DROP INDEX "IDX_responses_personId_activityId"`);
    await queryRunner.query(`DROP INDEX "IDX_responses_activityId"`);
    await queryRunner.query(`DROP INDEX "IDX_responses_personId"`);
    await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_responses_activityId"`);
    await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "FK_responses_personId"`);
    await queryRunner.query(`DROP TABLE "responses"`);
  }
}
