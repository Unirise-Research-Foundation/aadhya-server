import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServerUp(): string {
    return this.appService.getServerUpMessage();
  }

  @Get('/health')
  @Public()
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }

  @Get('/db-check')
  checkDb() {
    return this.appService.checkDbConnection();
  }
}
