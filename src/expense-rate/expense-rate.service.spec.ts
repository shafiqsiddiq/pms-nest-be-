import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseRateService } from './expense-rate.service';

describe('ExpenseRateService', () => {
  let service: ExpenseRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseRateService],
    }).compile();

    service = module.get<ExpenseRateService>(ExpenseRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
