import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseRateController } from './expense-rate.controller';
import { ExpenseRateService } from './expense-rate.service';

describe('ExpenseRateController', () => {
  let controller: ExpenseRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseRateController],
      providers: [ExpenseRateService],
    }).compile();

    controller = module.get<ExpenseRateController>(ExpenseRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
