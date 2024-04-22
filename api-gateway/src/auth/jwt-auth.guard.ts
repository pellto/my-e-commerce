import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RoleName } from 'src/user/enum/user.enum';
import { IS_PUBLIC_KEY } from 'src/common/decorator/public.decorator';
import { ROLE_KEY } from 'src/common/decorator/role.decorator';

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
      const request = http.getRequest<Request>();
      const token = request.headers?.authorization.split(' ')[1];
      return this.authService.validateRole(token, requiredRole, request);
    }
    return super.canActivate(context);
  }
}
