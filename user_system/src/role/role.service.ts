import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/role.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RoleName } from './role.constant';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async create({ name }: CreateRoleDto) {
    const role = this.roleRepository.create({ name });
    await this.roleRepository.insert(role);
    return role;
  }

  async getRoleById(id: number) {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new UnauthorizedException('Not exist role!');
    }
    return role;
  }

  async getRoleByName(name: RoleName) {
    const role = await this.roleRepository.findOneBy({ name });
    if (!role) {
      throw new UnauthorizedException('Not Exist roleName.');
    }
    return role;
  }
}
