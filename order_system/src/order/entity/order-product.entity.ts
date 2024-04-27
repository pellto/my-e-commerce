import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { BaseProductEntity } from 'src/common/entity/base-product.entity';

@Entity()
export class OrderProduct extends BaseProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
