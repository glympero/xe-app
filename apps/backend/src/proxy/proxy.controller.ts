import { Controller, Get, Param } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}
  @Get(':input')
  getProxyData(@Param('input') input: string) {
    return this.proxyService.makeRequest(input);
  }
}
