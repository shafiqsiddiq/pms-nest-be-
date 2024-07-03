import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { StripeUsersService } from './stripe-users.service';
import { CreateStripeUserDto } from './dto/create-stripe-user.dto';
import { UpdateStripeUserDto } from './dto/update-stripe-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaymentRequestBody } from './dto/PaymentRequestBody';
import { Response } from 'express';
import { BAD_REQUEST_RESPONSE, CREATION_RESPONSE } from '@/common/constants/http-responses.types';

@Controller('stripe-users')
@ApiTags('stripe-users')
export class StripeUsersController {
  constructor(private readonly stripeUsersService: StripeUsersService) {}

  @Post()
  async create (@Res() response: Response,
  @Body() paymentRequestBody: PaymentRequestBody) {
    this.stripeUsersService
      .createPayment(paymentRequestBody)
      .then((res) => {
        response.status(CREATION_RESPONSE.status).json(res);
      })
      .catch((err) => {
        response.status(BAD_REQUEST_RESPONSE.status).json(err);
      });
  }
  

  @Get()
  async findAll() {
    return await this.stripeUsersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.stripeUsersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStripeUserDto: UpdateStripeUserDto) {
    return await this.stripeUsersService.update(id, updateStripeUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.stripeUsersService.remove(id);
  }
}
