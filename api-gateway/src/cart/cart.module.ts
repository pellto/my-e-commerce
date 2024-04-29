import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ProductModule } from 'src/product/product.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ProductModule],
  providers: [
    CartService,
    {
      provide: 'CART_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('cart_system.host'),
            port: configService.get('cart_system.port'),
          },
        });
      },
    },
  ],
  controllers: [CartController],
})
export class CartModule {}
