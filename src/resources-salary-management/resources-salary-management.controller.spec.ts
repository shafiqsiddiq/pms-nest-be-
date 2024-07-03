import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesSalaryManagementController } from './resources-salary-management.controller';
import { ResourcesSalaryManagementService } from './resources-salary-management.service';

describe('ResourcesSalaryManagementController', () => {
  let controller: ResourcesSalaryManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesSalaryManagementController],
      providers: [ResourcesSalaryManagementService],
    }).compile();

    controller = module.get<ResourcesSalaryManagementController>(ResourcesSalaryManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
