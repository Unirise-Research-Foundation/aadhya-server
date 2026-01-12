import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedBaselineAssessment1768500100000 implements MigrationInterface {
  name = 'SeedBaselineAssessment1768500100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "assessments" ("name", "description", "introduction", "conclusion") 
       VALUES ('Baseline', 'Initial baseline assessment to establish persons capabilities and learning profile', 'Answer based on how you feel at this moment. There are no wrong answers—just honest reflections about yourself. This helps us understand your unique strengths and learning style.', 'Thank you for taking the time to complete this assessment. We will use the information you provided to help you learn and grow.')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "assessments" WHERE "name" = 'Baseline'`,
    );
  }
}

