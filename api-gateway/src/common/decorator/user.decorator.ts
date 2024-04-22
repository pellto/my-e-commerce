import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface ValidatedUser {
  id: string;
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
