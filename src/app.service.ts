import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  getServerUpMessage(): string {
    return 'Server is Running';
  }
  
  getHealthCheck(){
    return "ok"
  }

  async checkDbConnection(){
    const client = new Client({
      host: process.env.DATABASE_HOST,           // service name = container hostname
      port: parseInt(process.env.DATABASE_PORT!),           // use container-internal port
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });


    try {
      await client.connect();
      const res = await client.query('SELECT * FROM test');
      await client.end();
      return res.rows;
    } catch (err) {
      return { error: '❌ DB query failed', message: err.message };
    }


  }

}
