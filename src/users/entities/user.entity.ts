import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from '../../common/enums/role.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  profilePicture: string;
}
