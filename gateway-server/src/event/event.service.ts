import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async fetchEvents(token: string) {
    const url = `${this.configService.get('EVENT_SERVICE_URL')}/events`;
    const headers = { Authorization: `Bearer ${token}` };

    const res = await firstValueFrom(
      this.httpService.get(url, { headers })
    );

    return res.data;
  }
}
