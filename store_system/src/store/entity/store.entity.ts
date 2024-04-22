import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreManager } from './store-manager.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  ownerId: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
  @OneToMany(() => StoreManager, (storeManager) => storeManager.store)
  manager?: StoreManager[];
}
