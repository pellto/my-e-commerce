import { TemporalEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MiddleCategory } from './middle-category.entity';

@Entity()
export class SmallCategory extends TemporalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => MiddleCategory, (middleCategory) => middleCategory.smallCategories)
  @JoinColumn({ name: 'middle_category_id' })
  middleCategory: MiddleCategory;
}
