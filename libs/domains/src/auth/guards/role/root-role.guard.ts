import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { AllowlistRoleNames } from '../../decorators/allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '../../decorators/blocklist-role-names/blocklist-role-names.decorator';

@Injectable()
export class RootRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const blocklistRoleNames = this.reflector.get(BlocklistRoleNames, context.getHandler());
    const allowlistRoleNames = this.reflector.get(AllowlistRoleNames, context.getHandler());
    const user = req.user as MyUserResponse | null;
    if (!user) return false;

    if (
      blocklistRoleNames.length > 0 &&
      user.roles.some((role) => blocklistRoleNames.includes(role.name))
    )
      return false;

    if (
      allowlistRoleNames.length > 0 &&
      !user.roles.some((role) => allowlistRoleNames.includes(role.name))
    )
      return false;

    return true;
  }
}
