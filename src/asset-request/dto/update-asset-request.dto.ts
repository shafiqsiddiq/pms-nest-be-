import { PartialType } from '@nestjs/swagger';
import { CreateAssetRequestDto } from './create-asset-request.dto';

export class UpdateAssetRequestDto extends PartialType(CreateAssetRequestDto) {}
