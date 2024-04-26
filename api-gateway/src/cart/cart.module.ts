import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ProductModule],
  providers: [
    CartService,
    {
      provide: 'CART_SERVICE',
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
  controllers: [CartController],
})
export class CartModule {}
