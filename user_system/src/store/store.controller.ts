import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('store')
export class StoreController {
  constructor(@Inject('KAFKA') private readonly kafkaProducer: ClientKafka) {}

  @Get()
  @Public()
  async sendMessage() {
    const message = { value: 'hello store' };
    this.kafkaProducer.emit('store.created', message);
    return 'SUCCESS';
  }
}
