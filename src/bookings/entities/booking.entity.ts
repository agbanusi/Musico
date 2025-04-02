import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Event } from '../../events/entities/event.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
export class Booking extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Artist, { eager: true })
  @JoinColumn()
  artist: Artist;

  @ManyToOne(() => Event, { eager: true })
  @JoinColumn()
  event: Event;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({ nullable: true })
  specialRequirements: string;

  @Column({ default: false })
  isPaid: boolean;
}
