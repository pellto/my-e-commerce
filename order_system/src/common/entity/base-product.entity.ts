import { Column } from 'typeorm';
import { TemporalUpdatableEntity } from './base.entity';

export class BaseProductEntity extends TemporalUpdatableEntity {
  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'product_option_category_id' })
  productOptionCategoryId: number;

  @Column({ name: 'product_option_id' })
  productOptionId: number;

  @Column({ name: 'quantity' })
  quantity: number;
}
