import { TemporalEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LargeCategory } from './large-category.entity';
import { SmallCategory } from './small-category.entity';

@Entity()
export class MiddleCategory extends TemporalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => LargeCategory, (largeCategory) => largeCategory.middleCategories)
  @JoinColumn({ name: 'large_category_id' })
  largeCategory: LargeCategory;

  @OneToMany(() => SmallCategory, (smallcategory) => smallcategory.middleCategory)
  smallCategories?: SmallCategory[];
}
