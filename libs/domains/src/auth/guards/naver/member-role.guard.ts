import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
import { GroupSlug } from '../../decorators/group-slug/group-slug.decorator';
import { RoleName } from '../../decorators/role-name/role-name.decorator';

@Injectable()
export class MemberRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const groupSlug = this.reflector.get(GroupSlug, context.getHandler());
    const roleName = this.reflector.get(RoleName, context.getHandler());
    const jwtPayload = req.user as JwtPayload | null;
    if (!jwtPayload) return false;

    return !!jwtPayload.memberRoles.some(
      (member) =>
        member.groupSlug === groupSlug &&
        member.roleNames.some((memberRoleName) => memberRoleName === roleName),
    );
  }
}
