import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserCreatePayloadDto } from './dto/user.dto';
import { RoleName } from './enum/user.enum';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async findAll(page: number, size: number) {
    const pattern = { cmd: 'findAll' };
    const payload = { page, size };
    const data = await firstValueFrom<{ id: string; email: string }[]>(
      this.client.send<{ id: string; email: string }[]>(pattern, payload),
    );
    return data;
  }

  async findOneById(id: number) {
    const pattern = { cmd: 'findOneById' };
    const payload = id;
    const data = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));
    return data;
  }

  async findOneByEmail(email: string) {
    const pattern = { cmd: 'findOneByEmail' };
    const payload = email;
    const data = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));
    return data;
  }

  async checkAlreadyExist(payload: { phoneNumber: string; email: string }): Promise<boolean> {
    const pattern = { cmd: 'checkAlreadyExist' };
    const { isAlreadyExist } = await firstValueFrom<{ isAlreadyExist: boolean }>(
      this.client.send<{ isAlreadyExist: boolean }>(pattern, payload),
    );
    return isAlreadyExist;
  }

  async findOneByEmailForAuth(payload: { email: string }): Promise<{ id: number; role: { name: RoleName } }> {
    const pattern = { cmd: 'findOneByEmailForAuth' };
    const data = await firstValueFrom<{ id: number; role: { name: RoleName } }>(
      this.client.send<{ id: number; role: { name: RoleName } }>(pattern, payload),
    );
    return data;
  }

  async findOneByPhoneNumber(phoneNumber: string) {
    return undefined;
  }

  async findOneByPohneNumberAndEmail(page: number, size: number) {
    return 'User findOneByPohneNumberAndEmail';
  }

  async create(payload: UserCreatePayloadDto) {
    const pattern = { cmd: 'create' };
    const data = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));
    return data;
  }

  async validate(email: string, password: string): Promise<{ id: number; email: string }> {
    const pattern = { cmd: 'validate' };
    const payload = { email, password };
    const data = await firstValueFrom<{ id: number; email: string }>(
      this.client.send<{ id: number; email: string }>(pattern, payload),
    );
    return data;
  }

  async changeLoginStatus(payload: { id: number; isLoggedIn: boolean }) {
    const pattern = { cmd: 'changeLoginStatus' };
    const data = await firstValueFrom<{ id: string }>(this.client.send<{ id: string }>(pattern, payload));
    return data;
  }
}
