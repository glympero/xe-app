import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ProxyService {
  constructor(private httpService: HttpService) {}
  async makeRequest(query: string) {
    return this.httpService
      .get(
        `https://4ulq3vb3dogn4fatjw3uq7kqby0dweob.lambda-url.eu-central-1.on.aws/?input=${query}`,
      )
      .pipe(map((resp) => resp.data));
  }
}
