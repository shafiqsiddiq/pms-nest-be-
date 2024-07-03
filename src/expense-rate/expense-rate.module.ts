import { Module } from '@nestjs/common';
import { ExpenseRateService } from './expense-rate.service';
import { ExpenseRateController } from './expense-rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseRate } from './entities/expense-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseRate])],
  controllers: [ExpenseRateController],
  providers: [ExpenseRateService]
})
export class ExpenseRateModule {}
