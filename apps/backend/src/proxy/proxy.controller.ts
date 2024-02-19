import {
  Controller,
  Get,
  Param,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}
  @Get(':input')
  getProxyData(@Param('input') input: string) {
    const response = this.proxyService.makeRequest(input);
    if (response) {
      return response;
    }
    throw new ServiceUnavailableException('Service Unavailable');
  }
}
