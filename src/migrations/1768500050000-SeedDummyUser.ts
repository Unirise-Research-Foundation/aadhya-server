import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedDummyUser1768500050000 implements MigrationInterface {
    name = 'SeedDummyUser1768500050000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Hash the password 'dummy' with bcrypt
        const hashedUserPassword = await bcrypt.hash('dummy_user', 10);
        const hashedEducatorPassword = await bcrypt.hash('dummy_educator', 10);

        // Insert dummy user
        await queryRunner.query(
            `INSERT INTO "person" ("name", "yob", "username", "password", "role") 
       VALUES ($1, $2, $3, $4, $5)`,
            ['Dummy User', 2000, 'dummy_user', hashedUserPassword, 'user'],
        );

        // Insert dummy educator
        await queryRunner.query(
            `INSERT INTO "person" ("name", "yob", "username", "password", "role") 
       VALUES ($1, $2, $3, $4, $5)`,
            ['Dummy Educator', 2000, 'dummy_educator', hashedEducatorPassword, 'educator'],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove dummy user
        await queryRunner.query(
            `DELETE FROM "person" WHERE "username" = 'dummy_user'`,
        );

        // Remove dummy educator
        await queryRunner.query(
            `DELETE FROM "person" WHERE "username" = 'dummy_educator'`,
        );
    }
}

