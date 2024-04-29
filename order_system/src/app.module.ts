import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfig from './config/mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `envs/.${process.env.NODE_STAGE}.env`,
      isGlobal: true,
      load: [mysqlConfig],
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

        if (configService.get('STAGE') === 'local') {
          obj = Object.assign(obj, {
            logging: true,
            synchronize: true,
          });
        }
        return obj;
      },
    }),
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
