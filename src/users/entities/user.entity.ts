import Model from '@/common/entities/Model.entity';
import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  AfterLoad,
  OneToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { helper } from '@/helper';
import { UserRoles } from '@/common/constants/enum';
import { UserProfile } from './user-profile.entity';
import { Task } from '@/tasks/entities/task.entity';
import { ProjectTeam } from '@/project-team/entities/project-team.entity';
import { ResourcesSalaryManagement } from '@/resources-salary-management/entities/resources-salary-management.entity';
import { AssetRequest } from '@/asset-request/entities/asset-request.entity';

@Entity('users')
export class Users extends Model {
  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  firstName: string;
  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  loginId: string;
  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  lastName: string;
  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;
  @Column({ name: 'phone_number', nullable: true, default: '' })
  phoneNumber: string;
  @Column({ name: 'birth_date', nullable: true, default: '' })
  birthDate: string;
  @Column({ name: 'active', default: true })
  isActive: boolean;
  @Column({ name: 'avatar', length: 150, default: '', nullable: true })
  avatar: string;
  @Column({ nullable: true })
  password: string;
  // @BeforeInsert()
  // async hashPassword() {
  //   if (this.password) {
  //     this.password = await helper.hashPassword(this.password);
  //   }
  // }
  

  // User role column
  @Column({
    type: 'enum',
    enum: UserRoles,
  })
  userRole: UserRoles;

  // Last login date time
 

  // User's subscriptions type

  // This coumn will store the card token provided by the stripe

  // One to many relationship with social login entity

  @OneToMany(() => Task, (task) => task.user)
  task: Task[];
  @OneToMany(() => AssetRequest, (requestAsset) => requestAsset.user)
  requestAsset: AssetRequest[];
  @OneToOne(
    () => ResourcesSalaryManagement,
    (resourceSalary) => resourceSalary.user,
  )
  resourceSalary: ResourcesSalaryManagement;
  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile: UserProfile;

  @ManyToMany(() => ProjectTeam, (team) => team.members, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  // @JoinTable()
  teams: ProjectTeam[];

  // @OneToMany(() => Review, (review) => review.assignTo)
  // reviews: Review[];


}
