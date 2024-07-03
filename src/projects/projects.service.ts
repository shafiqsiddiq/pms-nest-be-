import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { PaginationDto } from '@/common/dtos/pagination.dto';
import { helper } from '@/helper';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }
  create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.save(createProjectDto);
    return project;
  }


  async findAll(options: PaginationDto, value: any) {
    const { limit, page, isPagination } = options;
    if (isPagination) {

      console.log("true case running")
      const skip = (page - 1) * limit;

      let whereConditions: Array<any> = [];
      if (value) {
        whereConditions = [
          { projectName: ILike(`%${value}%`) }
        ];
      }

      if (value) {
        whereConditions = [
          { projectName: ILike(`%${value}%`) }
        ];

      }

      const data = await this.projectRepository.findAndCount({
        where: value ? whereConditions : {},
        // select: {
        //   userId: true,
        //   firstName: true,
        //   lastName: true,
        //   email: true,
        //   isActive: true,
        //   createdAt: true,
        // },
        relations: {
          // projectTeam: true,
        },
        order: {
        },
        skip: skip,
        take: limit,
      });
      const finalResponse = helper.paginateResponse(data, page, limit);
      return finalResponse;
    }
    else {
      console.log("false case running")
      const data = await this.projectRepository.find()
      return data
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} project`;
  }
  async findProjectByUuid(data) {
    const findIds = await this.projectRepository.find()
    console.log("project found ", data?.projectId)

    return await this.projectRepository.find({
      where: {
        projectId: data,
      },
    });
  }
  update(projectId: string, updateProjectDto: UpdateProjectDto) {
    const project = this.projectRepository.update(projectId, updateProjectDto);
    return project;
  }

  remove(projectId: string) {
    const project = this.projectRepository.delete(projectId);
    return project;
  }
}
