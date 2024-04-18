import { SetMetadata } from '@nestjs/common';
import { RoleName } from 'src/role/role.constant';

export const ROLE_KEY = 'role_key';
export const Role = (role: RoleName) => SetMetadata(ROLE_KEY, role);
