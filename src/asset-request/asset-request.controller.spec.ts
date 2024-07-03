import { Test, TestingModule } from '@nestjs/testing';
import { AssetRequestController } from './asset-request.controller';
import { AssetRequestService } from './asset-request.service';

describe('AssetRequestController', () => {
  let controller: AssetRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetRequestController],
      providers: [AssetRequestService],
    }).compile();

    controller = module.get<AssetRequestController>(AssetRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
