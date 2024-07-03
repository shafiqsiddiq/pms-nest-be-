import { PartialType } from '@nestjs/swagger';
import { CreateResourcesSalaryManagementDto } from './create-resources-salary-management.dto';

export class UpdateResourcesSalaryManagementDto extends PartialType(CreateResourcesSalaryManagementDto) {}
