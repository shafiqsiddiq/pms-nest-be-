import { Module } from '@nestjs/common';
import { ProjectTeamService } from './project-team.service';
import { ProjectTeamController } from './project-team.controller';
import { ProjectTeam } from './entities/project-team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@/users/entities/user.entity';
import { Project } from '@/projects/entities/project.entity';
import { ProjectsService } from '@/projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTeam,Users,Project])],
  controllers: [ProjectTeamController],
  providers: [ProjectTeamService,ProjectsService]
})
export class ProjectTeamModule {}
