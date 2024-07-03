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
export class CreateProjectTeamDto {
  @ApiProperty({ description: 'The name of the project team',uniqueItems:true })
  @IsNotEmpty()
  @IsString()
  
  readonly teamName: string;

  @ApiProperty({
    description: 'An array of user IDs representing the members of the project team',
    example: ["qwewr345rdfdgv"],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  readonly members: string[];

  @ApiProperty({
    description: 'ID of the associated project',
    example: 1,
     nullable:true
  })
  @IsNotEmpty()
  @IsUUID()
  
  readonly project: string; 

}
