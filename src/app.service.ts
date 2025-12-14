import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource() private datasource: DataSource,
    private configService: ConfigService,
  ) {}

  getServerUpMessage(): string {
    return 'Server is Running';
  }

  getHealthCheck() {
    return 'ok';
  }

  async checkDbConnection() {
    try {
      if (this.datasource.isInitialized) {
        const typeormConfig = this.configService.get('typeorm');
        const dbName = typeormConfig?.database || 'unknown';
        const dbPort = typeormConfig?.port || 'unknown';

        return {
          message: 'DB connected successfully',
          database: dbName,
          port: dbPort,
        };
      }
    } catch (error) {
      return {
        error: '❌ Database connection failed',
        message: error.message,
      };
    }
  }
}
