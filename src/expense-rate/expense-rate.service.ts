import { Injectable } from '@nestjs/common';
import { CreateExpenseRateDto } from './dto/create-expense-rate.dto';
import { UpdateExpenseRateDto } from './dto/update-expense-rate.dto';
import { ExpenseRate } from './entities/expense-rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseRateService {
  constructor(
    @InjectRepository(ExpenseRate)
    private readonly expenseRate: Repository<ExpenseRate>,
  ) {}
  async create(createExpenseRateDto: CreateExpenseRateDto) {
    const expense = await this.expenseRate.save(createExpenseRateDto);
    return expense;
  }

  async findAll() {
    const expense = await this.expenseRate.find();
    return expense[0];
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseRate`;
  }

  update(id: string, updateExpenseRateDto: UpdateExpenseRateDto) {
    const expense = this.expenseRate.update(id,updateExpenseRateDto);
    return expense;
  }

  remove(id: string) {
    const expense = this.expenseRate.delete(id);
    return expense;
  }
}
