import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectTeam } from '@/project-team/entities/project-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project]),ProjectTeam],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
