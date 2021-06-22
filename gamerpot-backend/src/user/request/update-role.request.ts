import { IsEnum } from 'class-validator';
import { UserRole } from '../user-role';

export class UpdateRoleRequest {
  @IsEnum(UserRole, {
    message: 'Los únicos roles disponibles son NORMAL o ADMIN',
  })
  role: UserRole;
}
