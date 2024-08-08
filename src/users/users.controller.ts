import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/auth/guards/local-auth.guard';
import { ApiQueryArray } from '@/common/decorators/apiQuery.decorator';
import { ApiPaginationResponseInterceptor } from '@/common/interceptors/api-pagination.response';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from '@/auth/dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get('/findUserByIdWithProjects/:userId')
  async findUserByIdWithProjects(@Param('userId') userId: string) {
    const userWithProjects = await this.usersService.findUserByIdWithProjects(
      userId,
    );

    if (userWithProjects) {
      return userWithProjects;
    } else {
      throw new NotFoundException('User not found');
    }
  }
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
    {
      name: 'isPagination',
      type: Boolean,
      required: false,
    },
  ])
  findAll(
    @Query('search_text') search: string,
    @Query('isPagination') isPagination: boolean,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const pagination: PaginationDto = { limit, page, isPagination };
    return this.usersService.findAll(pagination, search);
  }
  @UseInterceptors(ApiPaginationResponseInterceptor)
  @Get('/myResourcesTasks')
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
  myResourcesTasks(
    @Query('search_text') search: string,
    // @Query('isPagination') isPagination: boolean,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const pagination: PaginationDto = { limit, page };
    let data = this.usersService.findAll(pagination, search);
    return data
  }

  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() body: CreateUserDto) {
    console.log('user body', body);
    return this.usersService.updateUser(id, body);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
