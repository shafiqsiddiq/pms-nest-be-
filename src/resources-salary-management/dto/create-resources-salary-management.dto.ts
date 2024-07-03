import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateResourcesSalaryManagementDto {
  @ApiProperty({
    example: '100',
  })
  @IsNotEmpty()
  @IsString()
  salaryPKR: string;
  @ApiProperty({
    example: '50',
  })
  @IsNotEmpty()
  @IsString()
  salaryDollar: string;

  // Admin id
  @ApiProperty({
    example: 'user uuid',
    nullable:true
  })
  @IsString()
  @IsNotEmpty({ message: 'userid is required' })
  userId: string;
}
