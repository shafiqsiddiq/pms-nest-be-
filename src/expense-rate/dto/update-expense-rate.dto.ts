import { PartialType } from '@nestjs/swagger';
import { CreateExpenseRateDto } from './create-expense-rate.dto';

export class UpdateExpenseRateDto extends PartialType(CreateExpenseRateDto) {}
