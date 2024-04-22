import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3003,
          },
        });
      },
    },
  ],
})
export class ProductModule {}
