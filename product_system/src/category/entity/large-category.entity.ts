import { TemporalEntity } from 'src/common/entity/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MiddleCategory } from './middle-category.entity';

@Entity()
export class LargeCategory extends TemporalEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MiddleCategory, (middleCategory) => middleCategory.largeCategory)
  middleCategories: MiddleCategory[];
}
