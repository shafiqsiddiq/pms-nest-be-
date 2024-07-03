import { Users } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('resources-salary-management')
export class ResourcesSalaryManagement {
  @PrimaryGeneratedColumn("uuid")
  salaryId: string; // Assuming id is an auto-incrementing number
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  salaryPKR: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  salaryDollar: string;
  // join user to task
  @Column({
    nullable: true,
  })
  userId: string;
  @OneToOne(() => Users, (user) => user.resourceSalary, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Users;
}
