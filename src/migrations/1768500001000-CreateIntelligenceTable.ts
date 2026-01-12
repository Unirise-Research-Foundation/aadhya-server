import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIntelligenceTable1768500001000 implements MigrationInterface {
  name = 'CreateIntelligenceTable1768500001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "intelligence" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "personId" uuid NOT NULL,
        "data" jsonb,
        CONSTRAINT "UQ_intelligence_personId" UNIQUE ("personId"),
        CONSTRAINT "PK_intelligence_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "intelligence" ADD CONSTRAINT "FK_intelligence_personId" 
       FOREIGN KEY ("personId") REFERENCES "person"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_intelligence_personId" ON "intelligence" ("personId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_intelligence_personId"`);
    await queryRunner.query(`ALTER TABLE "intelligence" DROP CONSTRAINT "FK_intelligence_personId"`);
    await queryRunner.query(`DROP TABLE "intelligence"`);
  }
}

