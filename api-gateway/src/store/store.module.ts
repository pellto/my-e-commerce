import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule],
  controllers: [StoreController],
  providers: [
    StoreService,
    {
      provide: 'STORE_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('store_system.host'),
            port: configService.get('store_system.port'),
          },
        });
      },
    },
  ],
  exports: [StoreService],
})
export class StoreModule {}
