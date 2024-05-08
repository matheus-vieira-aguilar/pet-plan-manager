import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import IUser from 'src/domain/user/user.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as any as IUser;

    return user;
  },
);
