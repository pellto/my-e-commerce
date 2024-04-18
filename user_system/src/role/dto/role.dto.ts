import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { RoleName } from '../role.constant';

export class CreateRoleDto {
  @Matches(
    `^${Object.values(RoleName)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  name: RoleName;
}
