import { Injectable } from '@nestjs/common';
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
}
