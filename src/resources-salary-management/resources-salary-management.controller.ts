import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { ResourcesSalaryManagementService } from './resources-salary-management.service';
import { CreateResourcesSalaryManagementDto } from './dto/create-resources-salary-management.dto';
import { UpdateResourcesSalaryManagementDto } from './dto/update-resources-salary-management.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Resources Salary Management")
@Controller('resources-salary-management')
export class ResourcesSalaryManagementController {
  constructor(private readonly resourcesSalaryManagementService: ResourcesSalaryManagementService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createResourcesSalaryManagementDto: CreateResourcesSalaryManagementDto) {
    return this.resourcesSalaryManagementService.create(createResourcesSalaryManagementDto);
  }

  @Get()
  findAll() {
    return this.resourcesSalaryManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesSalaryManagementService.findOne(+id);
  }

  @Patch(':salaryId')
  update(@Param('salaryId') salaryId: string, @Body() updateResourcesSalaryManagementDto: UpdateResourcesSalaryManagementDto) {
    return this.resourcesSalaryManagementService.update(salaryId, updateResourcesSalaryManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesSalaryManagementService.remove(id);
  }
}
