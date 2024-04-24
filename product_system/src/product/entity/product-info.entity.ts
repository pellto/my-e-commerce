import { TemporalEntity } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Product } from './product.entity';

@Entity()
@Unique('UQ_product_info_per_productId', ['productId', 'deletedAt'])
export class ProductInfo extends TemporalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @OneToOne(() => Product, (product) => product.info, { nullable: false, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'product_id' })
  productId: number;
}
