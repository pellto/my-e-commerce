import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ProductModule],
  providers: [
    OrderService,
    {
      provide: 'ORDER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3004,
          },
        });
      },
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
