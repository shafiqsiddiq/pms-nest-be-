import { Injectable } from '@nestjs/common';
import { CreateAssetRequestDto } from './dto/create-asset-request.dto';
import { UpdateAssetRequestDto } from './dto/update-asset-request.dto';
import { Users } from '@/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetRequest } from './entities/asset-request.entity';
import { ILike, Repository } from 'typeorm';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { helper } from '@/helper';

@Injectable()
export class AssetRequestService {
  constructor(
    @InjectRepository(AssetRequest)
    private readonly requestAssetRepository: Repository<AssetRequest>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) { }
  async create(createAssetRequestDto: CreateAssetRequestDto) {
    const resourceSalary = await this.requestAssetRepository.save(
      createAssetRequestDto,
    );
    return resourceSalary;
  }

  async findAll(options: PaginationDto, value: string) {
    const { limit, page } = options;
    const skip = (page - 1) * limit;
    let whereConditions: Array<any> = [];
    if (value) {
      whereConditions = [{ taskName: ILike(`%${value}%`) }];
    }
    if (value) {
      whereConditions = [{ taskName: ILike(`%${value}%`) }];
    }
    const data = await this.requestAssetRepository.findAndCount({
      where: value ? whereConditions : {},
      relations: {
        user: true,
        // project:true,
      },
      order: {},
      skip: skip,
      take: limit,
    });
    const finalResponse = helper.paginateResponse(data, page, limit);
    return finalResponse;
  }
  async findOne(userId: string) {
    const mytasks = await this.requestAssetRepository.find({
      where: { userId: userId },
    });
    return mytasks;
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} assetRequest`;
  // }

  async update(assetId: string, updateAssetRequestDto: UpdateAssetRequestDto) {
    const resourceSalary = await this.requestAssetRepository.update(assetId,
      updateAssetRequestDto,
    );
    return resourceSalary;
  }

  async remove(assetId: string) {
    const resourceSalary = await this.requestAssetRepository.delete(assetId);
    return resourceSalary;
  }
}
