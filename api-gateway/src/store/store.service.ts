import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ChangeOwnerPayloadDto,
  CreateStoreManagerPayloadDto,
  CreateStorePayloadDto,
  DeleteStorePayloadDto,
} from './dto/payload.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StoreService {
  constructor(@Inject('STORE_SERVICE') private client: ClientProxy) {}

  async create(payload: CreateStorePayloadDto) {
    const pattern = { cmd: 'create' };
    const data = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));
    return data;
  }

  async checkIsOwner(payload: { id: number; targetUserId: number }): Promise<void> {
    const pattern = { cmd: 'checkIsOwner' };
    const { isOwner } = await firstValueFrom<{ isOwner: boolean }>(
      this.client.send<{ isOwner: boolean }>(pattern, payload),
    );
    if (!isOwner) {
      throw new UnauthorizedException('User is not owner.');
    }
  }

  async createStoreManager(payload: CreateStoreManagerPayloadDto) {
    const pattern = { cmd: 'createStoreManager' };
    const data = await firstValueFrom<{ message: string }>(this.client.send<{ message: string }>(pattern, payload));
    return data;
  }

  async changeOwner(payload: ChangeOwnerPayloadDto) {
    const pattern = { cmd: 'changeOwner' };
    const data = await firstValueFrom<{ message: string }>(this.client.send<{ message: string }>(pattern, payload));
    return data;
  }

  async delete(payload: DeleteStorePayloadDto) {
    const pattern = { cmd: 'delete' };
    const data = await firstValueFrom<{ message: string }>(this.client.send<{ message: string }>(pattern, payload));
    return data;
  }
}
