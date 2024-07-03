import {
  Controller,
  Post,
  Body,
  HttpCode,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '@/auth/dto/create-user.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse()
  @HttpCode(200)
  @Post('login')
  async login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }
  @ApiOperation({ summary: 'create user' })
  @Post('register')
  create(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('reset-password/')
  @ApiQuery({
    name: 'email',
    required: true,
    type: String,
  })
  async resetPassword(
    @Query('email') email: string,
    @Body() body: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(email, body.newPassword);
  }
}
