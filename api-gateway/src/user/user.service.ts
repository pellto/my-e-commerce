import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async findAll(page: number, size: number) {
    return 'User FindAll';
  }

  async findOneById(id: number) {
    return 'User findOneById';
  }

  async findOneByEmail(page: number, size: number) {
    return 'User findOneByEmail';
  }

  async findOneByEmailForAuth(email: string) {
    return { id: 1, role: { role: { name: 'NORMAL' } } };
  }

  async findOneByPhoneNumber(page: number, size: number) {
    return 'User findOneByPhoneNumber';
  }

  async findOneByPohneNumberAndEmail(page: number, size: number) {
    return 'User findOneByPohneNumberAndEmail';
  }

  async create(page: number, size: number) {
    return 'User create';
  }

  async changeLoginStatus(page: number, size: number) {
    return 'User changeLoginStatus';
  }
}
