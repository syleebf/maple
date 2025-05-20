import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EventService } from './event.service';
import { Request } from 'express';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getEvents(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.eventService.fetchEvents(token);
  }
}
