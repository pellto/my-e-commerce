import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorator/public.decorator';
import { ROLE_KEY } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/role/role.constant';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const requiredRole = this.reflector.getAllAndOverride<RoleName>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const http = context.switchToHttp();

    if (requiredRole) {
      const { headers } = http.getRequest<Request>();
      const token = headers?.authorization.split(' ')[1];
      return this.authService.validateRole(token, requiredRole);
    }
    return super.canActivate(context);
  }
}
