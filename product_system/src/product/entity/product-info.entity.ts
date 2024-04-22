import { TemporalEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductInfo extends TemporalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @OneToOne(() => Product, (product) => product.info)
  @JoinColumn({ name: 'product_id' })
  productId: number;
}
