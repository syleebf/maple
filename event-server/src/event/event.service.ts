import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: MongoRepository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepo.create(createEventDto);
    return await this.eventRepo.save(event);
  }

  async findAll(): Promise<Event[]> {
    const now = new Date();
    const expiredEvents = await this.eventRepo.find({
      where: {
        endDate: { $lt: now },
        isActive: true,
      },
    });

    const updatePromises = expiredEvents.map(event =>
      this.eventRepo.updateOne(
        { _id: event.id },
        { $set: { isActive: false } },
      )
    );

    await Promise.all(updatePromises);

    return await this.eventRepo.find({
      where: { isActive: true },
    });
  }

  async findOne(id:string) {
    return await this.eventRepo.findOne({ where: { _id: new ObjectId(id) } });
  }

}
