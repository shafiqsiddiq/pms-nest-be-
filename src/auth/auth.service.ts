import { UsersService } from '@/users/users.service';
import { Injectable, HttpException, HttpStatus, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { helper } from '@/helper';
import { JwtPayload } from './interface/Jwt.interface';
import { CreateUserDto } from './dto/create-user.dto';
import {
  INVALID_OTP,
  USER_NOT_FOUND_RESPONSE,
} from '@/common/constants/http-responses.types';

import { UserRoles } from '@/common/constants/enum';

@Injectable()
@Global()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto): Promise<object> {

    const user = await this.usersService.create(body);
    console.log("testtt body",body)
    const {...rest } = user;
    const jwt_token = await this.createAccessToken(rest);
    return { ...rest, access_token: jwt_token,loginId:body.loginId };
  }

  async login(body: AuthDto): Promise<unknown> {
    const { email } = body;
    const user = await this.usersService.getByUserByEmail(email);

    if (!user)
      throw new HttpException('Invalid email/password', HttpStatus.NOT_FOUND);

    const verifyPassword = await helper.comparePassword(
      body.password,
      user.password,
    );

    if (!verifyPassword)
      throw new HttpException('Invalid email/password', HttpStatus.NOT_FOUND);
    const { password, ...rest } = user;
    const jwt_token = await this.createAccessToken(rest);
    return {
      status: HttpStatus.OK,
      data: { ...rest, access_token: jwt_token },
    };
  }

  public async createAccessToken(payload: JwtPayload): Promise<unknown> {
    const result = this.jwtService.sign(payload, {
      secret: process.env.JWT_KEY,
    });

    return result;
  }

  // Send reset password email
  async sendPasswordResetEmail(email: string) {
    const user = await this.usersService.getByUserByEmail(email);

    if (!user || user.userRole === UserRoles.ADMIN) {
      throw new HttpException(
        USER_NOT_FOUND_RESPONSE.message,
        USER_NOT_FOUND_RESPONSE.status,
      );
    }


    //Save OTP in user entity.

    // Send the password reset email
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.usersService.getByUserByEmail(email);
    if (!user) {
      throw new HttpException(
        USER_NOT_FOUND_RESPONSE.message,
        USER_NOT_FOUND_RESPONSE.status,
      );
    }
    this.usersService.resetPassword(user, newPassword);
  }



  async loggedInUser(email: string) {
    const user = await this.usersService.getByUserByEmail(email);
    return user;
  }
}
