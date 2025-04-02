import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    private readonly usersService: UsersService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { organizerId, ...eventData } = createEventDto;

    // Get the organizer user
    const organizer = await this.usersService.findOne(organizerId);

    // Create new event
    const event = this.eventsRepository.create({
      ...eventData,
      organizer,
      startDate: new Date(createEventDto.startDate),
      endDate: new Date(createEventDto.endDate),
    });

    return this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: Partial<Event>): Promise<Event> {
    const event = await this.findOne(id);

    // Handle date conversions if provided
    if (
      updateEventDto.startDate &&
      typeof updateEventDto.startDate === 'string'
    ) {
      updateEventDto.startDate = new Date(updateEventDto.startDate);
    }

    if (updateEventDto.endDate && typeof updateEventDto.endDate === 'string') {
      updateEventDto.endDate = new Date(updateEventDto.endDate);
    }

    // Update event
    Object.assign(event, updateEventDto);
    return this.eventsRepository.save(event);
  }

  async remove(id: string): Promise<void> {
    const event = await this.findOne(id);
    await this.eventsRepository.remove(event);
  }
}
