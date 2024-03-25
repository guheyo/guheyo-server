import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessAllGuard extends AuthGuard('jwt-access') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return req;
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    return user;
  }
}
