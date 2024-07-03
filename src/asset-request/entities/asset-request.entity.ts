import { PriorityTypes, RequestStatusTypes } from '@/common/constants/enum';
import { Users } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('request-asset')
export class AssetRequest {
  @PrimaryGeneratedColumn("uuid")
  assetId: string; // Assuming id is an auto-incrementing number
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  assetName: string;
  @Column({
    type: 'enum',
    enum: PriorityTypes,
    nullable: true
  })
  priority: PriorityTypes;
  @Column({
    type: 'enum',
    enum: RequestStatusTypes,
    nullable: true
  })
  requestStatus: RequestStatusTypes;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  description: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  rejectionReason: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  requestDate: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  requestBy: string;
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  approvedBy: string;
  // join user to task
  @Column({
    nullable: true,
  })
  userId: string;
  @ManyToOne(() => Users, (user) => user.requestAsset, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Users;
}
