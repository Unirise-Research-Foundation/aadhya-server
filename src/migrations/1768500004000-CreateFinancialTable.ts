import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFinancialTable1768500004000 implements MigrationInterface {
  name = 'CreateFinancialTable1768500004000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "financial" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "personId" uuid NOT NULL,
        "data" jsonb,
        CONSTRAINT "UQ_financial_personId" UNIQUE ("personId"),
        CONSTRAINT "PK_financial_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "financial" ADD CONSTRAINT "FK_financial_personId" 
       FOREIGN KEY ("personId") REFERENCES "person"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_financial_personId" ON "financial" ("personId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_financial_personId"`);
    await queryRunner.query(`ALTER TABLE "financial" DROP CONSTRAINT "FK_financial_personId"`);
    await queryRunner.query(`DROP TABLE "financial"`);
  }
}

