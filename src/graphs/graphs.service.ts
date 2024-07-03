import { Injectable } from '@nestjs/common';
import { CreateGraphDto } from './dto/create-graph.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Graph } from './entities/graph.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GraphsService {
  constructor(
    @InjectRepository(Graph)
    private graphRepo: Repository<Graph>,
  ) {}
  async create(body: CreateGraphDto) {
    const create_graphs = this.graphRepo.create(body);

    return await this.graphRepo.save(create_graphs);
  }

  async findAll() {
    const result = await this.graphRepo.find();
    return result;
  }
}
