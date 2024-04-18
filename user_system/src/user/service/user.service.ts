import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserCreateDto } from '../dto/user.dto';
import { FindUserResDto } from '../dto/user.res';
import { UserRole } from '../entity/user-role.entity';
import { RoleService } from 'src/role/role.service';
import { RoleName } from 'src/role/role.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private dataSource: DataSource,
  ) {}

  async findAll(page: number, size: number): Promise<FindUserResDto[]> {
    const users = await this.userRepository.find({ skip: (page - 1) * size, take: size });
    return users.map(this.changeEntityToFindUserResDto);
  }

  async findOneById(id: number): Promise<FindUserResDto> {
    const user = await this.userRepository.findOneBy({ id });
    return this.changeEntityToFindUserResDto(user);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByEmailForAuth(email: string) {
    return this.userRepository.findOne({ where: { email }, relations: { role: { role: {} } } });
  }

  async findOneByPhoneNumber(phoneNumber: string) {
    return this.userRepository.findOneBy({ phoneNumber });
  }

  async findOneByPhoneNumberAndEmail(phoneNumber: string, email: string) {
    return this.userRepository.findOneBy({ phoneNumber, email });
  }

  async create({ email, password, phoneNumber, name, role: targetRole }: UserCreateDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const role = await this.roleService.getRoleByName(targetRole);

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userEntity = queryRunner.manager.create(User, { email, password, phoneNumber, name });
      await queryRunner.manager.insert(User, userEntity);
      const userRoleEntity = queryRunner.manager.create(UserRole, { user: userEntity, role: { id: role.id } });
      await queryRunner.manager.insert(UserRole, userRoleEntity);

      await queryRunner.commitTransaction();
      return { id: userEntity.id };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // TODO: Delete refresh token
  async changeLoginStatus(id: number, status: boolean): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user is not exist.');
    }
    user.isLoggedIn = status;
    await this.userRepository.update({ id }, user);
  }

  private changeEntityToFindUserResDto(user: User): FindUserResDto {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
