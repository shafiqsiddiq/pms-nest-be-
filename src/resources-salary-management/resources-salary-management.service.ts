import { Injectable } from '@nestjs/common';
import { CreateResourcesSalaryManagementDto } from './dto/create-resources-salary-management.dto';
import { UpdateResourcesSalaryManagementDto } from './dto/update-resources-salary-management.dto';
import { ResourcesSalaryManagement } from './entities/resources-salary-management.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@/users/entities/user.entity';

@Injectable()
export class ResourcesSalaryManagementService {
  constructor(
    @InjectRepository(ResourcesSalaryManagement)
    private readonly resourcesSalaryManagemenRepository: Repository<ResourcesSalaryManagement>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) { }
  async create(
    createResourcesSalaryManagementDto: CreateResourcesSalaryManagementDto,
  ) {
    const resourceSalary = await this.resourcesSalaryManagemenRepository.save(
      createResourcesSalaryManagementDto,
    );
    return resourceSalary;
  }

  async findAll() {
    const resourceSalary = await this.resourcesSalaryManagemenRepository.find({
      relations: ['user'],
    });
    // chnge the respone your desired format
    // return resourceSalary.map((resourceSalary) => ({
    //   salaryId: resourceSalary.salaryId,
    //   salaryPKR: resourceSalary.salaryPKR,
    //   salaryDollar: resourceSalary.salaryDollar,
    //   userName: resourceSalary.user.firstName,
    //   userId: resourceSalary.user.userId,
    // }));

    return resourceSalary;
  }

  findOne(id: number) {
    return `This action returns a #${id} resourcesSalaryManagement`;
  }

  update(
    salaryId: string,
    updateResourcesSalaryManagementDto: UpdateResourcesSalaryManagementDto,
  ) {

    const salary = this.resourcesSalaryManagemenRepository.update(salaryId, updateResourcesSalaryManagementDto);
    return salary;
  }
  async remove(id: string) {
    const resource = await this.resourcesSalaryManagemenRepository.delete(id)
    return resource;
  }
}
