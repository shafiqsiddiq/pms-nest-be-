import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './user.entity';
import Model from '@/common/entities/Model.entity';

@Entity()
export class UserProfile extends Model {
  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  lastName: string;

  @Column({ name: 'phone_number', nullable: true, default: '' })
  phoneNumber: string;

  @Column({ name: 'birth_date', nullable: true, default: '' })
  birthDate: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  city: string;
  @OneToOne(() => Users, (user) => user.userProfile, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: Users;
}
