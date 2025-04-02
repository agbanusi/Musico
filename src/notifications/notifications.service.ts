import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export enum NotificationType {
  BOOKING_CREATED = 'booking_created',
  BOOKING_CONFIRMED = 'booking_confirmed',
  BOOKING_CANCELLED = 'booking_cancelled',
  PAYMENT_RECEIVED = 'payment_received',
  PAYMENT_FAILED = 'payment_failed',
}

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendNotification(userId: string, type: NotificationType, data: any) {
    this.client.emit('notifications', {
      userId,
      type,
      data,
      timestamp: new Date(),
    });
  }

  async sendBookingCreatedNotification(
    bookingId: string,
    artistId: string,
    eventId: string,
  ) {
    this.sendNotification(artistId, NotificationType.BOOKING_CREATED, {
      bookingId,
      eventId,
      message: 'You have a new booking request',
    });
  }

  async sendBookingConfirmedNotification(bookingId: string, userId: string) {
    this.sendNotification(userId, NotificationType.BOOKING_CONFIRMED, {
      bookingId,
      message: 'Your booking has been confirmed',
    });
  }

  async sendBookingCancelledNotification(
    bookingId: string,
    userId: string,
    artistId: string,
  ) {
    this.sendNotification(userId, NotificationType.BOOKING_CANCELLED, {
      bookingId,
      message: 'Your booking has been cancelled',
    });

    this.sendNotification(artistId, NotificationType.BOOKING_CANCELLED, {
      bookingId,
      message: 'A booking has been cancelled',
    });
  }

  async sendPaymentReceivedNotification(
    bookingId: string,
    userId: string,
    amount: number,
  ) {
    this.sendNotification(userId, NotificationType.PAYMENT_RECEIVED, {
      bookingId,
      amount,
      message: `Payment of $${amount} has been received for booking #${bookingId}`,
    });
  }

  async sendPaymentFailedNotification(bookingId: string, userId: string) {
    this.sendNotification(userId, NotificationType.PAYMENT_FAILED, {
      bookingId,
      message: 'Payment failed for your booking',
    });
  }
}
