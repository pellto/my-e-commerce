import { TemporalEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ProductOption } from './product-option';

@Entity({ name: 'product_option_category' })
export class ProductOptionCategory extends TemporalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.options)
  @JoinColumn({ name: 'product_id' })
  productId: number;

  @OneToMany(() => ProductOption, (productOption) => productOption.optionCategoryId)
  productOptions: ProductOption[];
}
