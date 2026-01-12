import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePersonalityTable1768500002000 implements MigrationInterface {
  name = 'CreatePersonalityTable1768500002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "personality" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "personId" uuid NOT NULL,
        "data" jsonb,
        CONSTRAINT "UQ_personality_personId" UNIQUE ("personId"),
        CONSTRAINT "PK_personality_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "personality" ADD CONSTRAINT "FK_personality_personId" 
       FOREIGN KEY ("personId") REFERENCES "person"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_personality_personId" ON "personality" ("personId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_personality_personId"`);
    await queryRunner.query(`ALTER TABLE "personality" DROP CONSTRAINT "FK_personality_personId"`);
    await queryRunner.query(`DROP TABLE "personality"`);
  }
}

