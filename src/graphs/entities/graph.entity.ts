import Model from '@/common/entities/Model.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('graphs')
export class Graph extends Model {
  
  @Column({ nullable: true, default: '' })
  graphPointsSummary: string;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  graphPoints: any[];

  // @Column('jsonb', { nullable: true })
  // documents?: object[];

  // Many to one relationship with agreement
 
}
