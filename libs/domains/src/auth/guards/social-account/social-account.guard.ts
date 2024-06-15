import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { AllowlistSocialProviders } from '../../decorators/allowlist-social-providers/allowlist-social-providers.decorator';

@Injectable()
export class SocialAccountGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const allowlistSocialProviders = this.reflector.get(
      AllowlistSocialProviders,
      context.getHandler(),
    );
    const user = req.user as MyUserResponse | null;
    if (!user) return false;

    if (
      allowlistSocialProviders.length > 0 &&
      !user.socialAccounts.some((socialAccount) =>
        allowlistSocialProviders.includes(socialAccount.provider),
      )
    )
      return false;

    return true;
  }
}
