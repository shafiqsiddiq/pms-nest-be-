import { Module } from '@nestjs/common';
import { ResourcesSalaryManagementService } from './resources-salary-management.service';
import { ResourcesSalaryManagementController } from './resources-salary-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesSalaryManagement } from './entities/resources-salary-management.entity';
import { Users } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResourcesSalaryManagement,Users])],
  controllers: [ResourcesSalaryManagementController],
  providers: [ResourcesSalaryManagementService]
})
export class ResourcesSalaryManagementModule {}
