
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
export class CreateExpenseRateDto {
  @ApiProperty(
    {example:0}
  )
  @IsNotEmpty()
  @IsNumber()
  dollarRate : number;
  @ApiProperty(
    {example:0}
  )
  @IsNotEmpty()
  @IsNumber()
  monthlyExpense: number;
}
