import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
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
    const jwtPayload = req.user as JwtPayload | null;
    if (!jwtPayload) return false;

    if (
      blocklistRoleNames.length > 0 &&
      jwtPayload.rootRoleNames.some((roleName) => blocklistRoleNames.includes(roleName))
    )
      return false;

    if (
      allowlistRoleNames.length > 0 &&
      !jwtPayload.rootRoleNames.some((roleName) => allowlistRoleNames.includes(roleName))
    )
      return false;

    return true;
  }
}
