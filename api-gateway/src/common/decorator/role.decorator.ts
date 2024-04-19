import { SetMetadata } from '@nestjs/common';
import { RoleName } from 'src/user/enum/user.enum';

export const ROLE_KEY = 'role_key';
export const Role = (role: RoleName) => SetMetadata(ROLE_KEY, role);
