import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { BaseProductEntity } from 'src/common/entity/base-product.entity';

@Entity()
export class CartProduct extends BaseProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.products)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
