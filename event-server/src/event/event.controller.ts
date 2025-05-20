import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  async eventCreate(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }

  @Get('list')
  async eventList() {
    return await this.eventService.findAll();
  }
  
  @Get(':id')
  async eventDetail(@Param('id') id: string) {
    return await this.eventService.findOne(id);
  }
}
