import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStorePayloadDto } from './dto/payload.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StoreService {
  constructor(@Inject('STORE_SERVICE') private client: ClientProxy) {}

  async create(payload: CreateStorePayloadDto) {
    const pattern = { cmd: 'create' };
    const data = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));
    return data;
  }
}
