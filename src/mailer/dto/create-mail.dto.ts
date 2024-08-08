import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsNull } from 'typeorm';
export class CreateMailDto {
  @ApiProperty({ description: 'The name of the project team', nullable:true})
  @IsNotEmpty()
  @IsString()
  
  readonly to: string;
  @ApiProperty({ description: 'The name of the project team',uniqueItems:true })
  @IsNotEmpty()
  @IsString()
  
  readonly subject: string;
  @ApiProperty({ description: 'The name of the project team',uniqueItems:true })
  @IsNotEmpty()
  @IsString()
  
  readonly text: string;
  @ApiProperty({ description: 'The name of the project team',uniqueItems:true })
  @IsNotEmpty()
  @IsString()
  
  readonly html: string;

}
