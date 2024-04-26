import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    CartModule,
  ],
})
export class AppModule {}
