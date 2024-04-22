import { LargeCategory } from 'src/category/entity/large-category.entity';
import { MiddleCategory } from 'src/category/entity/middle-category.entity';
import { SmallCategory } from 'src/category/entity/small-category.entity';
import { TemporalUpdatableEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductInfo } from './product-info.entity';
import { ProductOptionCategory } from './product-option-category';

@Entity()
export class Product extends TemporalUpdatableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  storeId: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => LargeCategory, (largeCategory) => largeCategory.id)
  @JoinColumn({ name: 'large_category_id' })
  largeCategory: LargeCategory;

  @ManyToOne(() => MiddleCategory, (middleCategory) => middleCategory.id)
  @JoinColumn({ name: 'middle_category_id' })
  middleCategory?: MiddleCategory;

  @ManyToOne(() => SmallCategory, (smallCategory) => smallCategory.id)
  @JoinColumn({ name: 'small_category_id' })
  smallCategory?: SmallCategory;

  @OneToOne(() => ProductInfo, (productInfo) => productInfo.id)
  info?: ProductInfo;

  @OneToMany(() => ProductOptionCategory, (productOptionCategory) => productOptionCategory.id)
  options?: ProductOptionCategory[];
}
