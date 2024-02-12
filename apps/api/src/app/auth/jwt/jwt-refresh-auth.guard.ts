import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const parentCanActivate = (await super.canActivate(context)) as boolean;
    return parentCanActivate;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return req;
  }
}
