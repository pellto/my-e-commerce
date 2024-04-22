import { Controller } from '@nestjs/common';
import { StoreService } from './store.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateStoreReqDto } from './dto/req.dto';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @MessagePattern({ cmd: 'create' })
  async create(createStoreReqDto: CreateStoreReqDto) {
    const store = await this.storeService.create(createStoreReqDto);
    return store;
  }
}
