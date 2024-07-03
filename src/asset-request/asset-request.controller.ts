import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { AssetRequestService } from './asset-request.service';
import { CreateAssetRequestDto } from './dto/create-asset-request.dto';
import { UpdateAssetRequestDto } from './dto/update-asset-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiQueryArray } from '@/common/decorators/apiQuery.decorator';
import { ApiPaginationResponseInterceptor } from '@/common/interceptors/api-pagination.response';
import { PaginationDto } from '@/common/dtos/pagination.dto';
@ApiTags("Asset Request")
@Controller('asset-request')
export class AssetRequestController {
  constructor(private readonly assetRequestService: AssetRequestService) {}

  @Post()
  create(@Body() createAssetRequestDto: CreateAssetRequestDto) {
    return this.assetRequestService.create(createAssetRequestDto);
  }

  @Get()
  @UseInterceptors(ApiPaginationResponseInterceptor)
  @Get('/all')
  @ApiQueryArray([
    { name: 'limit', type: Number, minimum: 1, default: 10 },
    {
      name: 'page',
      type: Number,
      required: false,
      minimum: 1,
      default: 1,
    },
    {
      name: 'search_text',
      type: String,
      required: false,
    },
  ])
  async findAll(
    @Query('search_text') search: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const pagination: PaginationDto = { limit, page };
    return await this.assetRequestService.findAll(pagination, search);
  }
  @Get(':requestBy')
  findOne(@Param('requestBy') requestBy: string) {
    return this.assetRequestService.findOne(requestBy);
  }
  @Patch(':assetId')
  update(@Param('assetId') assetId: string, @Body() updateAssetRequestDto: UpdateAssetRequestDto) {
    return this.assetRequestService.update(assetId, updateAssetRequestDto);
  }

  @Delete(':assetId')
  remove(@Param('assetId') assetId: string) {
    return this.assetRequestService.remove(assetId);
  }
}
