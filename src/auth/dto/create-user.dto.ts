import { UserRoles } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
  IsUUID,
} from 'class-validator';
import { OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
 
  @ApiProperty({
    example: 'shafiq',
    default: 'shafiq',
  })
  @IsString()
  @IsNotEmpty({ message: 'first name is required' })
  firstName: string;

  @ApiProperty({
    example: 'siddiq',
    default: 'siddiq',
  })
  @IsString()
  @IsNotEmpty({ message: 'last name is required' })
  lastName: string;

  @ApiProperty({
    example: 'shafiqsiddiq@gmail.com',
    default: 'shafiqsiddiq@gmail.com',
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    example: 'Password@1',
    default: 'Password@1',
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

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: UserRoles.RESOURCE,
    default: UserRoles.RESOURCE,
  })
  @IsString()
  userRole: UserRoles;
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001', // Example UUID
    default: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsString()
  @IsUUID(4, { message: 'loginId must be a valid UUID' }) // Use IsUUID decorator
  loginId: string;
}
