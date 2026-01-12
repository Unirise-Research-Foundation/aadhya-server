import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamePeopleToRelationships1768211872000 implements MigrationInterface {
  name = 'RenamePeopleToRelationships1768211872000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Rename the table from "people" to "relationships"
    await queryRunner.query(`ALTER TABLE "people" RENAME TO "relationships"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rename the table back from "relationships" to "people"
    await queryRunner.query(`ALTER TABLE "relationships" RENAME TO "people"`);
  }
}

