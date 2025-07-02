import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerUpMessage(): string {
    return 'Server is Running';
  }
  
  getHealthCheck(){
    return "ok"
  }

}
