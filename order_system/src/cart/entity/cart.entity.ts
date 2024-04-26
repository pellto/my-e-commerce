import { TemporalUpdatableEntity } from 'src/common/entity/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartProduct } from './cart-product.entity';

@Entity()
export class Cart extends TemporalUpdatableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToMany(() => CartProduct, (product) => product.cart)
  products: CartProduct[];
}
