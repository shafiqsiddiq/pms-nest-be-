import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesSalaryManagementService } from './resources-salary-management.service';

describe('ResourcesSalaryManagementService', () => {
  let service: ResourcesSalaryManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourcesSalaryManagementService],
    }).compile();

    service = module.get<ResourcesSalaryManagementService>(ResourcesSalaryManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
