import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class AuthDto {
  
  @ApiProperty({
    example: '',
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    example: '',
  })
  @IsString()
  @MinLength(6, { message: 'password should be at least 6 characters long' })
  @MaxLength(50, {
    message: 'password should not be longer than 50 characters',
  })
  @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password too weak, password must contains one upper letter,number and a special character',
  })
  password: string;
}
