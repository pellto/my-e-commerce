import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysqlMyRootPassword', // TODO: fix to env
      database: 'my_e_commerce_dev',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
