import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
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
  exports: [StoreService],
})
export class StoreModule {}
