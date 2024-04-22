import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class StoreManager {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  managerId: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
  @ManyToOne(() => Store, (store) => store.manager)
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
