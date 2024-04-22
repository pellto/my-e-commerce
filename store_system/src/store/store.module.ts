import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entity/store.entity';
import { StoreManager } from './entity/store-manager.entity';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Store, StoreManager])],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
