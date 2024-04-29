import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductModule } from 'src/product/product.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ProductModule],
  providers: [
    OrderService,
    {
      provide: 'ORDER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('order_system.host'),
            port: configService.get('order_system.port'),
          },
        });
      },
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
