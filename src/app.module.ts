import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import typeORM from './typeorm.config';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { PersonModule } from './person/person.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeORM],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ConfigService.get('typeorm') as any,
    }),
    PersonModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // Tells Nest to apply globally
      useClass: ResponseInterceptor, // interceptor logic
    },
    {
      provide: APP_FILTER, // Global exception handler
      useClass: GlobalExceptionFilter, // filter logic
    },
  ],
})
export class AppModule {}
