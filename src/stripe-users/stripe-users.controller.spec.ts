import { Test, TestingModule } from '@nestjs/testing';
import { StripeUsersController } from './stripe-users.controller';
import { StripeUsersService } from './stripe-users.service';

describe('StripeUsersController', () => {
  let controller: StripeUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeUsersController],
      providers: [StripeUsersService],
    }).compile();

    controller = module.get<StripeUsersController>(StripeUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
