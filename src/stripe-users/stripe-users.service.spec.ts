import { Test, TestingModule } from '@nestjs/testing';
import { StripeUsersService } from './stripe-users.service';

describe('StripeUsersService', () => {
  let service: StripeUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeUsersService],
    }).compile();

    service = module.get<StripeUsersService>(StripeUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
