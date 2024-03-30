import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
import { GroupSlug } from '../../decorators/group-slug/group-slug.decorator';
import { AllowlistRoleNames } from '../../decorators/allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '../../decorators/blocklist-role-names/blocklist-role-names.decorator';

@Injectable()
export class MemberRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const groupSlug = this.reflector.get(GroupSlug, context.getHandler());
    const blocklistRoleNames = this.reflector.get(BlocklistRoleNames, context.getHandler());
    const allowlistRoleNames = this.reflector.get(AllowlistRoleNames, context.getHandler());
    const jwtPayload = req.user as JwtPayload | null;
    if (!jwtPayload) return false;

    if (
      !!blocklistRoleNames &&
      jwtPayload.memberRoles.some(
        (member) =>
          member.groupSlug === groupSlug &&
          blocklistRoleNames.some((blocklistRoleName) =>
            member.roleNames.includes(blocklistRoleName),
          ),
      )
    )
      return false;

    if (
      !!allowlistRoleNames &&
      !jwtPayload.memberRoles.some(
        (member) =>
          member.groupSlug === groupSlug &&
          allowlistRoleNames.some((allowlistRoleName) =>
            member.roleNames.includes(allowlistRoleName),
          ),
      )
    ) {
      return false;
    }
    return true;
  }
}
