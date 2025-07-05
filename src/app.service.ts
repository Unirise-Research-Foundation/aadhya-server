import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Test } from './entities/test.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource() private datasource: DataSource,
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  getServerUpMessage(): string {
    return 'Server is Running';
  }

  getHealthCheck() {
    return 'ok';
  }

  async checkDbConnection() {
    try {
      if (!this.datasource.isInitialized) {
        await this.datasource.initialize();
      }

      // NOTE: currently no migrates are created here
      // this was done for testing connectivity
      // actual entities along with the migrationswill be pushed in code for issue #5
      const users = await this.testRepository
        .createQueryBuilder('test')
        .select(['test.id', 'test.name'])
        .getRawMany();

      return users;
    } catch (error) {
      return {
        error: '❌ Database connection failed',
        message: error.message,
      };
    }
  }
}

// NOTE: STEPS to locally feed data and test endpoint
/*
1. Open a terminal into the DB container
  RUN COMMAND -> `docker compose exec db psql -U postgres -d aadhya_db`

  - db = service name in your docker-compose.yml
  -U postgres = DB username
  -d aadhya_db = DB name

2. You’ll now be inside the PostgreSQL CLI:
  aadhya_db=#

3. Run these SQL commands one by one inside PostgreSQL CLI:
    CREATE TABLE test (
      id SERIAL PRIMARY KEY,
      name TEXT
    );

    INSERT INTO test (name) VALUES ('hello'), ('world');

4. view inserted data
  SELECT * FROM test;

5. Now you can run the server and hit the endpoint /db-check to view connectivity
*/
