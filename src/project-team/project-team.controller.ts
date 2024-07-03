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
  ParseIntPipe,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProjectTeamService } from './project-team.service';
import { CreateProjectTeamDto } from './dto/create-project-team.dto';
import { UpdateProjectTeamDto } from './dto/update-project-team.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { ApiPaginationResponseInterceptor } from '@/common/interceptors/api-pagination.response';
import { ApiQueryArray } from '@/common/decorators/apiQuery.decorator';
import { JwtAuthGuard } from '@/auth/guards/local-auth.guard';
@ApiTags('Project Team')
@Controller('project-team')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class ProjectTeamController {
  constructor(private readonly projectTeamService: ProjectTeamService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProjectTeamDto: CreateProjectTeamDto) {
    return this.projectTeamService.createOrUpdate(createProjectTeamDto);
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
  ])
  async findAll(
    @Query('search_text') search: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const pagination: PaginationDto = { limit, page };
    return await this.projectTeamService.findAll(pagination, search);
  }
  @Get('findeUsers')
  async findUserProjects(@Param('id') id: string) {
    console.log('resourcesIds controller', id);
    return await this.projectTeamService.findUserProjects(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectTeamService.findOne(+id);
  }

  @Put(':id')
  async updateTeam(
    @Param('id') teamId: string,
    @Body() updateProjectTeamDto: CreateProjectTeamDto,
  ) {
    return this.projectTeamService.createOrUpdate(updateProjectTeamDto, teamId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectTeamService.remove(id);
  }
}
