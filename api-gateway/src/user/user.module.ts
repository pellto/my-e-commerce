import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  exports: [UserService],
  providers: [
    UserService,
    {
      provide: 'USER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('user_system.host'),
            port: configService.get('user_system.port'),
          },
        });
      },
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
