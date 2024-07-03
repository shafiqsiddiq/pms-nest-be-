import { ProjectTeam } from '@/project-team/entities/project-team.entity';
import { Task } from '@/tasks/entities/task.entity';
import { Users } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('Project')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  projectId: string; 
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    unique: true,
  })
  projectName: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  projectTimeline: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  projectCost: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  startDate: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  endDate: string;
  @OneToMany(() => Task, (task) => task.project)
  userTask: Task[];
  @OneToMany(() => ProjectTeam, (projectTeam) => projectTeam.project)
  projectTeam: ProjectTeam[];
}
