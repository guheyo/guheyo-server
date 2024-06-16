import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { SocialAccountErrorMessage } from '@lib/domains/social-account/domain/social-account.error.message';
import { AllowlistSocialProviders } from '../../decorators/allowlist-social-providers/allowlist-social-providers.decorator';
import { AuthErrorMessage } from '../../domain/auth.error.message';

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
    if (!user) throw new ForbiddenException(AuthErrorMessage.AUTHENTICATION_REQUIRED);

    if (
      allowlistSocialProviders.length > 0 &&
      !user.socialAccounts.some((socialAccount) =>
        allowlistSocialProviders.includes(socialAccount.provider),
      )
    )
      throw new ForbiddenException(SocialAccountErrorMessage.ACCESS_DENIED_PROVIDER);

    return true;
  }
}
