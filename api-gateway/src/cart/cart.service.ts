import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AddProductPayload } from './dto/payload.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CartService {
  constructor(@Inject('CART_SERVICE') private client: ClientProxy) {}

  async addProduct(payload: AddProductPayload) {
    const pattern = { cmd: 'addProduct' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }
}
