import { Injectable } from '@nestjs/common';
import { CreateStripeUserDto } from './dto/create-stripe-user.dto';
import { UpdateStripeUserDto } from './dto/update-stripe-user.dto';
import Stripe from 'stripe';
import { PaymentRequestBody } from './dto/PaymentRequestBody';

@Injectable()
export class StripeUsersService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe('sk_test_51PXgPb2MFYWZqf5ZcFfvvR8KpqvbtvMKtwSqpN0VwAZbjuNJbXKYMwIzab08y90oQa71QZq0YjfuR8kPhdiFwFiu00Q9TPNi2L', {
      apiVersion: '2023-08-16',
    });
  }

  createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let sumAmount = 0;
    paymentRequestBody.products.forEach((product) => {
      sumAmount = sumAmount + product.price * product.quantity;
    });
    return this.stripe.paymentIntents.create({
      amount: sumAmount * 100,
      currency: paymentRequestBody.currency,
    });
}

  async findAll() {
  const customers = await this.stripe.customers.list();
  return customers;
}

  async findOne(id: string) {
  const customer = await this.stripe.customers.retrieve(id);
  return customer;
}

  async update(id: string, updateStripeUserDto: UpdateStripeUserDto) {
  const customer = await this.stripe.customers.update(id, {
    name: updateStripeUserDto.name,
    email: updateStripeUserDto.email,
  });
  return customer;
}

  async remove(id: string) {
  const deletion = await this.stripe.customers.del(id);
  return deletion;
}
}
