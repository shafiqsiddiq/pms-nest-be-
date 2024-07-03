import { Controller, Get, Post, Body } from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { CreateGraphDto } from './dto/create-graph.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Graphs')
@Controller('graphs')
export class GraphsController {
  constructor(private readonly graphsService: GraphsService) {}

  @Post()
  create(@Body() createGraphDto: CreateGraphDto) {
    return this.graphsService.create(createGraphDto);
  }

  @Get()
  findAll() {
    return this.graphsService.findAll();
  }
}
