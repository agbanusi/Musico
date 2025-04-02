import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UsersService } from '../users/users.service';
import { ArtistsService } from '../artists/artists.service';
import { EventsService } from '../events/events.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
    private readonly usersService: UsersService,
    private readonly artistsService: ArtistsService,
    private readonly eventsService: EventsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { userId, artistId, eventId, ...bookingData } = createBookingDto;

    // Get related entities
    const user = await this.usersService.findOne(userId);
    const artist = await this.artistsService.findOne(artistId);
    const event = await this.eventsService.findOne(eventId);

    // Create new booking
    const booking = this.bookingsRepository.create({
      ...bookingData,
      user,
      artist,
      event,
      startTime: new Date(createBookingDto.startTime),
      endTime: new Date(createBookingDto.endTime),
      status: BookingStatus.PENDING,
    });

    const savedBooking = await this.bookingsRepository.save(booking);

    // Send notification to artist
    await this.notificationsService.sendBookingCreatedNotification(
      savedBooking.id,
      artistId,
      eventId,
    );

    return savedBooking;
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find();
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.status = status;

    const updatedBooking = await this.bookingsRepository.save(booking);

    // Send notifications based on status change
    if (status === BookingStatus.CONFIRMED) {
      await this.notificationsService.sendBookingConfirmedNotification(
        id,
        booking.user.id,
      );
    } else if (status === BookingStatus.CANCELLED) {
      await this.notificationsService.sendBookingCancelledNotification(
        id,
        booking.user.id,
        booking.artist.id,
      );
    }

    return updatedBooking;
  }

  async update(
    id: string,
    updateBookingDto: Partial<Booking>,
  ): Promise<Booking> {
    const booking = await this.findOne(id);

    // Handle date conversions if provided
    if (
      updateBookingDto.startTime &&
      typeof updateBookingDto.startTime === 'string'
    ) {
      updateBookingDto.startTime = new Date(updateBookingDto.startTime);
    }

    if (
      updateBookingDto.endTime &&
      typeof updateBookingDto.endTime === 'string'
    ) {
      updateBookingDto.endTime = new Date(updateBookingDto.endTime);
    }

    // Update booking
    Object.assign(booking, updateBookingDto);
    return this.bookingsRepository.save(booking);
  }

  async remove(id: string): Promise<void> {
    const booking = await this.findOne(id);

    // Send cancellation notifications
    await this.notificationsService.sendBookingCancelledNotification(
      id,
      booking.user.id,
      booking.artist.id,
    );

    await this.bookingsRepository.remove(booking);
  }
}
