import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginationResponseInterceptor } from '@/common/interceptors/api-pagination.response';
import { ApiQueryArray } from '@/common/decorators/apiQuery.decorator';
import { PaginationDto } from '@/common/dtos/pagination.dto';
@ApiTags("Project")
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
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
  async findAll(
    @Query('search_text') search: string,
    @Query('isPagination') isPagination: boolean,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const pagination: PaginationDto = { limit, page,isPagination };
    return await this.projectsService.findAll(pagination, search);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':projectId')
  update(@Param('projectId') projectId: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(projectId, updateProjectDto);
  }

  @Delete(':projectId')
  remove(@Param('projectId') projectId: string) {
    return this.projectsService.remove(projectId);
  }
}
