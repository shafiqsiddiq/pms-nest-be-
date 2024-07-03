import { PartialType } from '@nestjs/swagger';
import { CreateStripeUserDto } from './create-stripe-user.dto';

export class UpdateStripeUserDto extends PartialType(CreateStripeUserDto) {
    name?: string;
    email?: string;
}
