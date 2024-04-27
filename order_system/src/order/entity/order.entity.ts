import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProduct } from './order-product.entity';
import { OrderState } from '../enum/order.enum';
import { TemporalUpdatableEntity } from 'src/common/entity/base.entity';

@Entity({ name: 'orders' })
export class Order extends TemporalUpdatableEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'orderer_id' })
  ordererId: number;

  @Column({ name: 'code' })
  code: string;

  @Column({ type: 'enum', enum: OrderState })
  state: OrderState;

  @OneToMany(() => OrderProduct, (product) => product.order)
  products: OrderProduct[];
}
