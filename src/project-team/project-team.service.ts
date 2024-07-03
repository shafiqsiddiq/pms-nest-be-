import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectTeamDto } from './dto/create-project-team.dto';
import { UpdateProjectTeamDto } from './dto/update-project-team.dto';
import { Between, ILike, Repository } from 'typeorm';
import { ProjectTeam } from './entities/project-team.entity';
import { Users } from '@/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { helper } from '@/helper';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { ProjectsService } from '@/projects/projects.service';

@Injectable()
export class ProjectTeamService {
  constructor(
    @InjectRepository(ProjectTeam)
    private readonly teamRepository: Repository<ProjectTeam>,
    private readonly userService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}
  async createOrUpdate(createProjectTeamDto: CreateProjectTeamDto, teamId?: string): Promise<ProjectTeam> {
    const { teamName, members, project } = createProjectTeamDto;
    const projectFound = await this.projectsService.findProjectByUuid(project);

    let team: ProjectTeam;

    if (teamId) {
      // Update an existing team
      team = await this.teamRepository.findOneOrFail({
        where: { teamId: teamId },
        relations: ['members', 'project'],
      });
      team.teamName = teamName;
      team.members = await this.userService.findUsersByUuids(members);
      team.project = projectFound[0];
    } else {
      // Create a new team
      team = this.teamRepository.create({
        teamName,
        members: await this.userService.findUsersByUuids(members),
        project: projectFound[0],
      });
    }

    return this.teamRepository.save(team);
  }
  
  
  // async create(createProjectTeamDto: CreateProjectTeamDto): Promise<ProjectTeam> {
  //   const { teamName, members,project } = createProjectTeamDto;
  //   const projectFound = await this.projectsService.findProjectByUuid(project);
  //   console.log("projectId==>",projectFound[0])
  //   const team = this.teamRepository.create({
  //     teamName,
  //     members: await this.userService.findUsersByUuids(members),
  //      project:projectFound[0]
  //   });

  //   return this.teamRepository.save(team);
  // }

  // async findAll() {
  //   const teams = await this.teamRepository.find();
  //   return teams;
  // }
  async findAll(options: PaginationDto, value: string) {
    const { limit, page } = options;
    const skip = (page - 1) * limit;

    let whereConditions: Array<any> = [];
    if (value) {
      whereConditions = [{ teamName: ILike(`%${value}%`) }];
    }

    const data = await this.teamRepository.findAndCount({
        where: whereConditions.length > 0 ? whereConditions : {},
      relations: {
        members: true,
         project: true,
      },
      order: {},
      skip: skip,
      take: limit,
    });

    const finalResponse = helper.paginateResponse(data, page, limit);
    return finalResponse;
  }

  async findUserProjects(value: string) {
    console.log('resourcesIds', value);
    let whereConditions: Array<any> = [];
    if (value) {
      whereConditions = [{ resourcesIds: ILike(`%${value}%`) }];
    }

    const data = await this.teamRepository.findAndCount({
      where: whereConditions.length > 0 ? whereConditions : {},
      relations: {
        members: true,
        // project: true,
      },
      order: {},
    });

    return data;
  }
  findOne(id: number) {
    return `This action returns a #${id} projectTeam`;
  }

  async update(id:string, updateProjectTeamDto: UpdateProjectTeamDto) {
    const team = await this.teamRepository.findOne({
      where: {
        teamId: id,
      },
    });
    await this.teamRepository.save(team);
    return team;
  }

  async remove(id: string) {
    const team = await this.teamRepository.delete(id);
    return team;
  }
}
