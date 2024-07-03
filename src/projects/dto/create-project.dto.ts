import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateProjectDto {
  @ApiProperty({
    example: 'deafault project',
  })
  @IsNotEmpty()
  @IsString()
  projectName: string;
  @ApiProperty({
    example: '10',
  })
  @IsNotEmpty()
  @IsString()
  projectTimeline: string;
  @ApiProperty({
    example: '1500',
  })
  @IsNotEmpty()
  @IsString()
  projectCost: string;
  @ApiProperty({
    example: '2024-05-20',
  })
  @IsNotEmpty()
  @IsString()
  startDate: string;
  @ApiProperty({
    example: '2024-10-20',
  })
  @IsNotEmpty()
  @IsString()
  endDate: string;
}
