import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfig from './config/mysql.config';
import jwtConfig from './config/jwt.config';
import cartSystemConfig from './config/cart-system.config';
import userSystemConfig from './config/user-system.config';
import storeSystemConfig from './config/store-system.config';
import productSystemConfig from './config/product-system.config';
import orderSystemConfig from './config/order-system.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `envs/.${process.env.NODE_STAGE}.env`,
      isGlobal: true,
      load: [
        mysqlConfig,
        jwtConfig,
        userSystemConfig,
        storeSystemConfig,
        productSystemConfig,
        cartSystemConfig,
        orderSystemConfig,
      ],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          database: configService.get('mysql.database'),
          autoLoadEntities: true,
        };

        if (configService.get('NODE_STAGE') === 'local') {
          obj = Object.assign(obj, {
            logging: true,
            synchronize: true,
          });
        }
        return obj;
      },
    }),

    UserModule,
    AuthModule,
    StoreModule,
    ProductModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
