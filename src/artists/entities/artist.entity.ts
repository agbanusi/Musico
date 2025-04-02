import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('artists')
export class Artist extends BaseEntity {
  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column()
  stageName: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  hourlyRate: number;

  @Column({ type: 'simple-array', default: '' })
  genres: string[];

  @Column({ nullable: true })
  website: string;

  @Column({ type: 'simple-array', nullable: true })
  socialMediaLinks: string[];

  @Column({ type: 'simple-array', nullable: true })
  mediaUrls: string[];
}
