
import { Users } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('expense-rate')
export class ExpenseRate {
  @PrimaryGeneratedColumn('uuid')
  expenseId: string; // Assuming id is an auto-incrementing number
  @Column({
    type: 'int',
    nullable: true,
  })
  dollarRate: number;
  @Column({
    type: 'int',
    nullable: true,
  })
  monthlyExpense: number;
  
}
