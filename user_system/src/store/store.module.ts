import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StoreController } from './store.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-server-0',
            brokers: ['localhost:9093'],
          },
          consumer: {
            groupId: 'pelltos_kafka',
          },
        },
      },
    ]),
  ],
  controllers: [StoreController],
})
export class StoreModule {}
