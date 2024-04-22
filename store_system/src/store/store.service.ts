import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entity/store.entity';
import { Repository } from 'typeorm';
import { StoreManager } from './entity/store-manager.entity';
import { CreateStoreReqDto } from './dto/req.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private readonly storeRepository: Repository<Store>,
    @InjectRepository(StoreManager) private readonly storeManagerRepository: Repository<StoreManager>,
  ) {}

  async create({ ownerId, name }: CreateStoreReqDto) {
    const store = this.storeRepository.create({ ownerId, name });
    await this.storeRepository.insert(store);
    return store;
  }

  async checkIsOwner(id: number, targetUserId: number) {
    const store = await this.storeRepository.findOneBy({ id, ownerId: targetUserId });
    return { isOwner: store !== null };
  }

  async createStoreManager(storeId: number, requesterId: number, targetSellerId: number) {
    const { isOwner } = await this.checkIsOwner(storeId, requesterId);
    if (!isOwner) {
      throw new UnauthorizedException('User is not owner.');
    }
    const storeManager = this.storeManagerRepository.create({ managerId: targetSellerId, store: { id: storeId } });
    await this.storeManagerRepository.insert(storeManager);
    return { message: 'success' };
  }

  async changeOwner(storeId: number, requesterId: number, targetSellerId: number) {
    const store = await this.storeRepository.findOneBy({ id: storeId });
    if (store.ownerId !== requesterId) {
      throw new UnauthorizedException('Requester is not owner.');
    }
    store.ownerId = targetSellerId;
    await this.storeRepository.update({ id: storeId }, store);
    return { message: 'success' };
  }

  async delete(id: number, requesterId: number) {
    const store = await this.storeRepository.findOneBy({ id });
    if (store.ownerId !== requesterId) {
      throw new UnauthorizedException('Requester is not owner.');
    }
    await this.storeRepository.softDelete({ id });
    return { message: 'success' };
  }
}
