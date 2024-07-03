import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { ExpenseRateService } from './expense-rate.service';
import { CreateExpenseRateDto } from './dto/create-expense-rate.dto';
import { UpdateExpenseRateDto } from './dto/update-expense-rate.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Expense")
@Controller('expense-rate')
export class ExpenseRateController {
  constructor(private readonly expenseRateService: ExpenseRateService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createExpenseRateDto: CreateExpenseRateDto) {
    return this.expenseRateService.create(createExpenseRateDto);
  }

  @Get()
  findAll() {
    return this.expenseRateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseRateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseRateDto: UpdateExpenseRateDto) {
    return this.expenseRateService.update(id, updateExpenseRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseRateService.remove(id);
  }
}
