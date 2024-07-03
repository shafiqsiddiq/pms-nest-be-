import { ProjectTeam } from '@/project-team/entities/project-team.entity';
import { Project } from '@/projects/entities/project.entity';
import { Users } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('Task')
export class Task {
  @PrimaryGeneratedColumn()
  taskId: string; // Assuming id is an auto-incrementing number
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  taskName: string;
  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,

  })
  taskDescription: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  resourceName: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  createdDate: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  
  estimatedTime: number;
  @Column({
    type: 'integer',
    nullable: true,
  })
  loggedTime: number;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  taskStatus: string;
  // join user to task
  @Column({
    nullable: true,
  })
  userId: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  projectName: string;
  @Column({
    nullable: true,
  })
  projectId: string;
  @ManyToOne(() => Project, (project) => project.userTask, {
    cascade: true,
    // onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @ManyToOne(() => Users, (user) => user.task, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Users;
}
