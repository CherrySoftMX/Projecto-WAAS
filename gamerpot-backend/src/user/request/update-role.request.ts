import { IsEnum } from 'class-validator';
import { UserRole } from '../entities/user-role';

export class UpdateRoleRequest {
  @IsEnum(UserRole, {
    message: 'Los únicos roles disponibles son NORMAL o ADMIN',
  })
  role: UserRole;
}
