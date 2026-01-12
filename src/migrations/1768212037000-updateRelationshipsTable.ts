import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRelationshipsTable1768212037000 implements MigrationInterface {
  name = 'UpdateRelationshipsTable1768212037000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the unique constraint on personId (only drop if it exists)
    await queryRunner.query(
      `ALTER TABLE "relationships" DROP CONSTRAINT IF EXISTS "UQ_97cfa7b6e5e4a55a5b417f0bfcb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationships" DROP CONSTRAINT IF EXISTS "REL_97cfa7b6e5e4a55a5b417f0bfc"`,
    );

    // Add the new columns (make them nullable first, then we can update and make NOT NULL if needed)
    await queryRunner.query(`ALTER TABLE "relationships" ADD "relatedPersonId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "relationships" ADD "relationType" character varying(100)`,
    );

    // Add foreign key constraint for relatedPersonId
    await queryRunner.query(
      `ALTER TABLE "relationships" ADD CONSTRAINT "FK_relationships_relatedPersonId" FOREIGN KEY ("relatedPersonId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint for relatedPersonId
    await queryRunner.query(
      `ALTER TABLE "relationships" DROP CONSTRAINT IF EXISTS "FK_relationships_relatedPersonId"`,
    );

    // Drop the new columns
    await queryRunner.query(`ALTER TABLE "relationships" DROP COLUMN IF EXISTS "relationType"`);
    await queryRunner.query(`ALTER TABLE "relationships" DROP COLUMN IF EXISTS "relatedPersonId"`);

    // Restore the unique constraint on personId
    await queryRunner.query(
      `ALTER TABLE "relationships" ADD CONSTRAINT "UQ_97cfa7b6e5e4a55a5b417f0bfcb" UNIQUE ("personId")`,
    );
  }
}
