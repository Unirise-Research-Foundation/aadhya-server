import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePhysicalTable1768500003000 implements MigrationInterface {
  name = 'CreatePhysicalTable1768500003000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "physical" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "personId" uuid NOT NULL,
        "data" jsonb,
        CONSTRAINT "UQ_physical_personId" UNIQUE ("personId"),
        CONSTRAINT "PK_physical_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "physical" ADD CONSTRAINT "FK_physical_personId" 
       FOREIGN KEY ("personId") REFERENCES "person"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_physical_personId" ON "physical" ("personId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_physical_personId"`);
    await queryRunner.query(`ALTER TABLE "physical" DROP CONSTRAINT "FK_physical_personId"`);
    await queryRunner.query(`DROP TABLE "physical"`);
  }
}

