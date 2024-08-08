import { Project } from '@/projects/entities/project.entity';
import { Task } from '@/tasks/entities/task.entity';
import { Users } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('project-team')
export class ProjectTeam {
  @PrimaryGeneratedColumn('uuid')
  teamId: string;

  @Column({ unique: true })
  teamName: string;


  @ManyToMany(() => Users, (user) => user.teams)
  @JoinTable()
  // @JoinTable({
  //   name: 'project_team_members',
  //   joinColumns: [{ name: 'team_id' }],
  //   inverseJoinColumns: [{ name: 'user_id' }],
  // })
  members: Users[];


  @ManyToOne(() => Project, project => project.projectTeam)
  project: Project;
}
