import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJsonColumnsToPerson1753043223609 implements MigrationInterface {
  name = 'AddJsonColumnsToPerson1753043223609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" ADD "intelligences" jsonb`);
    await queryRunner.query(`ALTER TABLE "person" ADD "personality" jsonb`);
    await queryRunner.query(`ALTER TABLE "person" ADD "physical" jsonb`);
    await queryRunner.query(`ALTER TABLE "person" ADD "financial" jsonb`);
    await queryRunner.query(`ALTER TABLE "person" ADD "people" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "people"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "financial"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "physical"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "personality"`);
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "intelligences"`);
  }
} 