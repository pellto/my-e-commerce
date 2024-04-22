import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/role/entity/role.entity';

@Entity({ name: 'user_role' })
export class UserRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User, (user) => user.role)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
