import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AddProductPayload,
  ChangeCartProductPayload,
  ChangeCartProductQuantityPayload,
  GetCartPayload,
  RemoveProductPayload,
} from './dto/payload.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CartService {
  constructor(@Inject('CART_SERVICE') private client: ClientProxy) {}

  async addProduct(payload: AddProductPayload) {
    const pattern = { cmd: 'addProduct' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async removeProduct(payload: RemoveProductPayload) {
    const pattern = { cmd: 'removeProduct' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async changeProductQuantity(payload: ChangeCartProductQuantityPayload) {
    const pattern = { cmd: 'changeProductQuantity' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async changeProduct(payload: ChangeCartProductPayload) {
    const pattern = { cmd: 'changeProduct' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async getCart(payload: GetCartPayload) {
    const pattern = { cmd: 'getCart' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }
}
