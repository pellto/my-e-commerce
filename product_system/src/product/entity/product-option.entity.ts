import { TemporalUpdatableEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOptionState } from '../enum/product-option-state.enum';
import { ProductOptionCategory } from './product-option-category.entity';

@Entity({ name: 'product_option' })
export class ProductOption extends TemporalUpdatableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: ProductOptionState })
  state: ProductOptionState;

  @ManyToOne(() => ProductOptionCategory, (productOptionCategory) => productOptionCategory.productOptions)
  @JoinColumn({ name: 'product_option_category_id' })
  optionCategoryId: ProductOptionCategory;

  public changeNameOrPrice(name?: string, price?: number) {
    this.name = name;
    this.price = price;
  }
}
