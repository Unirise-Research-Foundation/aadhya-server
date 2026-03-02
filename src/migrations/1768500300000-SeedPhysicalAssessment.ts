import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPhysicalAssessment1768500300000 implements MigrationInterface {
  name = 'SeedPhysicalAssessment1768500300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "assessments" ("name", "description", "introduction", "conclusion")
       VALUES ('Physical', 'Physical assessment to establish baseline sensory and functional capabilities across vision, hearing, speech, intellectual, locomotor, smell, and touch domains.', 'Answer based on how you typically experience things. There are no right or wrong answers — just honest reflections about your senses and physical abilities. This helps us understand your unique profile.', 'Thank you for completing this assessment. The results will help us better understand your sensory and physical profile to provide the right support and environment for you.')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "assessments" WHERE "name" = 'Physical'`);
  }
}
