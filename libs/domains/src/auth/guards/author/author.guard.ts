import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import _ from 'lodash';
import { AuthorIdPath } from '../../decorators/author-id-path/author-id-path.decorator';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const args = ctx.getArgs();
    const authorIdPath = this.reflector.get(AuthorIdPath, context.getHandler());
    return !!req.user.id && req.user.id === _.get(args, authorIdPath);
  }
}
