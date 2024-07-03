import { Module } from '@nestjs/common';
import { AssetRequestService } from './asset-request.service';
import { AssetRequestController } from './asset-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetRequest } from './entities/asset-request.entity';
import { Users } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssetRequest,Users])],
  controllers: [AssetRequestController],
  providers: [AssetRequestService]
})
export class AssetRequestModule {}
