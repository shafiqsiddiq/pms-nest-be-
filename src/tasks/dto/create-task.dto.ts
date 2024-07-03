import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateTaskDto {
  @ApiProperty({
    example: 'task name',
  })
  @IsNotEmpty()
  @IsString()
  taskName: string;
  @ApiProperty({
    example: 'task description',
  })
  @IsNotEmpty()
  @IsString()
  taskDescription: string;
  @ApiProperty({
    example: 'resource name',
  })
  @IsNotEmpty()
  @IsString()
  resourceName: string;
  @ApiProperty({
    example: '2024-05-15',
  })
  @IsNotEmpty()
  @IsString()
  createdDate: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  loggedTime: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  estimatedTime: number;
  @ApiProperty({
    example: 'In-progress',
  })
  @IsNotEmpty()
  @IsString()
  taskStatus: string;

  // Admin id
  @ApiProperty({
    example: 'projectId uuid',
  })
  @IsString()
  @IsNotEmpty({ message: 'projectId is required' })
  projectId: string;
  @ApiProperty({
    example: 'project name',
  })
  @IsNotEmpty()
  @IsString()
  projectName: string;
  @ApiProperty({
    example: 'user uuid',
  })
  @IsString()
  @IsNotEmpty({ message: 'userid is required' })
  userId: string;
}
