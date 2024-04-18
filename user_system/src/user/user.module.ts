import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { RoleModule } from 'src/role/role.module';
import { UserRole } from './entity/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole]), RoleModule],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
