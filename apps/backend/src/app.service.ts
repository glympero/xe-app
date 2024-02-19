import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiName(): string {
    return 'Xe API';
  }
}
