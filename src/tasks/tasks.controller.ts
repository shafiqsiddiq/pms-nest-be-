import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  UseInterceptors,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { ApiPaginationResponseInterceptor } from '@/common/interceptors/api-pagination.response';
import { ApiQueryArray } from '@/common/decorators/apiQuery.decorator';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    // return createTaskDto
    return this.tasksService.create(createTaskDto);
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
    return await this.tasksService.findAll(pagination, search);
  }
  @Get(':userId')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiOperation({ summary: 'Find one task by user ID' })
  @ApiQuery({ name: 'taskStatus', required: false, description: 'Task status' })
  @ApiQuery({ name: 'search_text', required: false, description: 'Search text for task name' })
  @ApiQuery({ name: 'created_date', required: false, description: 'Created date of the task' })
  async findOne(
    @Param('userId') userId: string,
    @Query('taskStatus') taskStatus?: string,
    @Query('search_text') search?: string,
    @Query('created_date') createdDate?: string,
  ) {
    const tasksGroupedByDate = await this.tasksService.findOne(userId, taskStatus, search, createdDate);
    return { data: tasksGroupedByDate };
  }
  // @Get(':userId')
  // findOne(@Param('userId') userId: string) {
  //   return this.tasksService.findOne(userId);
  // }
  // @Get(':userId')
  // async findOne(@Param('userId') userId: string) {
  //   const tasksGroupedByDate = await this.tasksService.findOne(userId);
  //   return { data: tasksGroupedByDate };
  // }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
