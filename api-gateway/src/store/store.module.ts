import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [StoreController],
  providers: [
    StoreService,
    {
      provide: 'STORE_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3002,
          },
        });
      },
    },
  ],
})
export class StoreModule {}
