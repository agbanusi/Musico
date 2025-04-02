import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Booking } from '../../bookings/entities/booking.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
}

@Entity('payments')
export class Payment extends BaseEntity {
  @OneToOne(() => Booking, { eager: true })
  @JoinColumn()
  booking: Booking;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ type: 'jsonb', nullable: true })
  paymentDetails: Record<string, any>;
}
