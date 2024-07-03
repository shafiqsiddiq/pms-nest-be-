
import { PriorityTypes, RequestStatusTypes } from '@/common/constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAssetRequestDto {
  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  assetName: string;
  @ApiProperty({
    example: PriorityTypes.MEDIUM,
    default: PriorityTypes.MEDIUM,
  })
  @IsString()
  priority: PriorityTypes;
  @ApiProperty({
    example: RequestStatusTypes.PENDING,
    default: RequestStatusTypes.PENDING,
  })
  @IsString()
  requestStatus: RequestStatusTypes;
  @ApiProperty({
    example: '',
    default:''
  })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({
    example: '',
    default:''
  })
  @IsString()
  rejectionReason: string;
  @ApiProperty({
    example: '2024-05-15',
  })
  @IsNotEmpty()
  @IsString()
  requestDate: string;
  @ApiProperty({
    example: '',
    nullable: true
  })
  @IsString()
  requestBy: string;
  @ApiProperty({
    example: '',
    nullable: true
  })
  @IsString()
  approvedBy: string;
  // Admin id
  @ApiProperty({
    example: 'uuid',
    nullable: true
  })
  @IsString()
  @IsNotEmpty({ message: 'userid is required' })
  userId: string;
}
