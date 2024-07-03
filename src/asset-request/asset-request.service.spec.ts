import { Test, TestingModule } from '@nestjs/testing';
import { AssetRequestService } from './asset-request.service';

describe('AssetRequestService', () => {
  let service: AssetRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetRequestService],
    }).compile();

    service = module.get<AssetRequestService>(AssetRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
