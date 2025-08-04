import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private datasource: DataSource) {}

  getServerUpMessage(): string {
    return 'Server is Running';
  }

  getHealthCheck() {
    return 'ok';
  }

  async checkDbConnection() {
    try {
      if (!this.datasource.isInitialized) {
        return {
          message: 'DB connected successfully',
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
