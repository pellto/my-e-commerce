import { Controller } from '@nestjs/common';
import { StoreService } from './store.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  ChangeOwnerReqDto,
  CheckIsManagerReqDto,
  CheckIsOwnerReqDto,
  CreateStoreManagerReqDto,
  CreateStoreReqDto,
  DeleteReqDto,
} from './dto/req.dto';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @MessagePattern({ cmd: 'create' })
  async create(createStoreReqDto: CreateStoreReqDto) {
    const store = await this.storeService.create(createStoreReqDto);
    return store;
  }

  @MessagePattern({ cmd: 'checkIsOwner' })
  async checkIsOwner({ id, targetUserId }: CheckIsOwnerReqDto) {
    const isOwner = await this.storeService.checkIsOwner(id, targetUserId);
    return isOwner;
  }

  @MessagePattern({ cmd: 'checkIsManager' })
  async checkIsManager({ id, managerId }: CheckIsManagerReqDto) {
    const isManager = await this.storeService.checkIsManager(id, managerId);
    return isManager;
  }

  @MessagePattern({ cmd: 'createStoreManager' })
  async createStoreManager({ requesterId, targetSellerId, storeId }: CreateStoreManagerReqDto) {
    const isOwner = await this.storeService.createStoreManager(storeId, requesterId, targetSellerId);
    return isOwner;
  }

  @MessagePattern({ cmd: 'changeOwner' })
  async changeOwner({ requesterId, targetSellerId, storeId }: ChangeOwnerReqDto) {
    const isOwner = await this.storeService.changeOwner(storeId, requesterId, targetSellerId);
    return isOwner;
  }

  @MessagePattern({ cmd: 'delete' })
  async delete({ id, requesterId }: DeleteReqDto) {
    const isOwner = await this.storeService.delete(id, requesterId);
    return isOwner;
  }
}
