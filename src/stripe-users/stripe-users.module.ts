import { Module } from '@nestjs/common';
import { StripeUsersService } from './stripe-users.service';
import { StripeUsersController } from './stripe-users.controller';

@Module({
  controllers: [StripeUsersController],
  providers: [StripeUsersService],
})
export class StripeUsersModule {}
