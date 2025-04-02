import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { BookingsService } from '../bookings/bookings.service';
import { NotificationsService } from '../notifications/notifications.service';
import { BookingStatus } from '../bookings/entities/booking.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    private readonly bookingsService: BookingsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { bookingId, ...paymentData } = createPaymentDto;

    // Get the booking
    const booking = await this.bookingsService.findOne(bookingId);

    // Create payment
    const payment = this.paymentsRepository.create({
      ...paymentData,
      booking,
      status: PaymentStatus.PENDING,
    });

    const savedPayment = await this.paymentsRepository.save(payment);

    // Simulate payment processing
    await this.processPayment(savedPayment);

    return savedPayment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async findByBookingId(bookingId: string): Promise<Payment | null> {
    return this.paymentsRepository.findOne({
      where: { booking: { id: bookingId } },
    });
  }

  private async processPayment(payment: Payment): Promise<void> {
    // Simulate payment processing with artificial delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Randomly determine payment success or failure (90% success rate)
    const isSuccess = Math.random() < 0.9;

    if (isSuccess) {
      // Update payment status
      payment.status = PaymentStatus.COMPLETED;
      await this.paymentsRepository.save(payment);

      // Update booking to paid
      const booking = payment.booking;
      booking.isPaid = true;

      // If the booking was pending, update it to confirmed
      if (booking.status === BookingStatus.PENDING) {
        await this.bookingsService.updateStatus(
          booking.id,
          BookingStatus.CONFIRMED,
        );
      } else {
        await this.bookingsService.update(booking.id, { isPaid: true });
      }

      // Send notification
      await this.notificationsService.sendPaymentReceivedNotification(
        booking.id,
        booking.user.id,
        payment.amount,
      );
    } else {
      // Update payment status to failed
      payment.status = PaymentStatus.FAILED;
      await this.paymentsRepository.save(payment);

      // Send notification
      await this.notificationsService.sendPaymentFailedNotification(
        payment.booking.id,
        payment.booking.user.id,
      );
    }
  }
}
