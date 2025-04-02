import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('events')
export class Event extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  location: string;

  @Column({ nullable: true })
  venueDetails: string;

  @Column({ nullable: true })
  eventPosterUrl: string;

  @Column({ type: 'int', default: 0 })
  expectedAttendees: number;

  @Column({ nullable: true })
  eventType: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  organizer: User;
}
