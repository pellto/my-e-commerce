import { TemporalUpdatableEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartProduct extends TemporalUpdatableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'product_option_category_id' })
  productOptionCategoryId: number;

  @Column({ name: 'product_option_id' })
  productOptionId: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.products)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
