import { GqlThrottlerBehindProxyGuard } from '@app/api/app/throttler/gql-throttler-behind-proxy.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { RequiredJwtUserGuard } from '../../guards/jwt/required-jwt-user.guard';
import { SocialAccountGuard } from '../../guards/social-account/social-account.guard';
import { AllowlistSocialProviders } from '../allowlist-social-providers/allowlist-social-providers.decorator';
import { AllowlistRoleNames } from '../allowlist-role-names/allowlist-role-names.decorator';
import { BlocklistRoleNames } from '../blocklist-role-names/blocklist-role-names.decorator';
import { RootRoleGuard } from '../../guards/role/root-role.guard';

export function AuthenticatedSocialAccountAndRole({
  providers,
  allowlistRoleNames,
  blocklistRoleNames,
}: {
  providers: string[];
  allowlistRoleNames: string[];
  blocklistRoleNames: string[];
}) {
  return applyDecorators(
    AllowlistSocialProviders(providers),
    AllowlistRoleNames(allowlistRoleNames),
    BlocklistRoleNames(blocklistRoleNames),
    UseGuards(
      GqlThrottlerBehindProxyGuard,
      RequiredJwtUserGuard,
      SocialAccountGuard,
      RootRoleGuard,
    ),
  );
}
