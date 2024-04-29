import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { StoreModule } from 'src/store/store.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [StoreModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('product_system.host'),
            port: configService.get('product_system.port'),
          },
        });
      },
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
