import { GqlThrottlerBehindProxyGuard } from '@app/api/app/throttler/gql-throttler-behind-proxy.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { RequiredJwtUserGuard } from '../../guards/jwt/required-jwt-user.guard';
import { SocialAccountGuard } from '../../guards/social-account/social-account.guard';
import { AllowlistSocialProviders } from '../allowlist-social-providers/allowlist-social-providers.decorator';

export function AuthenticatedSocialAccount(...providers: string[]) {
  return applyDecorators(
    AllowlistSocialProviders(providers),
    UseGuards(GqlThrottlerBehindProxyGuard, RequiredJwtUserGuard, SocialAccountGuard),
  );
}
