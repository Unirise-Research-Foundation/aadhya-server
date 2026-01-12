import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationshipsTable1768500005000 implements MigrationInterface {
  name = 'CreateRelationshipsTable1768500005000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "relationships" (
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "personId" uuid NOT NULL,
        "relatedPersonId" uuid,
        "relationType" character varying(100),
        "data" jsonb,
        CONSTRAINT "PK_relationships_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "relationships" ADD CONSTRAINT "FK_relationships_personId" 
       FOREIGN KEY ("personId") REFERENCES "person"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "relationships" ADD CONSTRAINT "FK_relationships_relatedPersonId" 
       FOREIGN KEY ("relatedPersonId") REFERENCES "person"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_relationships_personId" ON "relationships" ("personId")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_relationships_relatedPersonId" ON "relationships" ("relatedPersonId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_relationships_relatedPersonId"`);
    await queryRunner.query(`DROP INDEX "IDX_relationships_personId"`);
    await queryRunner.query(`ALTER TABLE "relationships" DROP CONSTRAINT "FK_relationships_relatedPersonId"`);
    await queryRunner.query(`ALTER TABLE "relationships" DROP CONSTRAINT "FK_relationships_personId"`);
    await queryRunner.query(`DROP TABLE "relationships"`);
  }
}

