import { Body, Controller, Param, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { RegisterRequest } from 'src/auth/request/register.request';
import { Roles } from 'src/auth/roles/role.decorator';
import { UserRole } from '../entities/user-role';
import { User } from '../entities/user.entity';
import { UpdateRoleRequest } from '../request/update-role.request';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Actualiza la información del usuario que está "loggeado".
   *
   * @returns El usuario con su nueva información.
   */
  @Put()
  async updateLoggedUserInfo(
    @Req() request: Request,
    @Body() body: RegisterRequest,
  ) {
    const { userId } = request.user as any;
    return this.userService.updateUser(userId, new User({ ...body }));
  }

  /**
   * Actualiza el rol de un usuaurio. Nótese que este método solamente puede ser
   * solicitado por un usuario con el rol @enum{UserRole.ADMIN}
   *
   * @returns El usuario con su nuevo rol.
   */
  @Put('/:userId/roles')
  @Roles(UserRole.ADMIN)
  async updateUserRole(@Param() params, @Body() body: UpdateRoleRequest) {
    return this.userService.updateUserRole(params.userId, body.role);
  }
}
