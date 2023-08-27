import { PickType } from '@nestjs/swagger';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';

export class SocialAccountCreateRequest extends PickType(SocialAccountEntity, [
  'provider',
  'socialId',
  'userId',
  'refreshToken',
  'accessToken',
  'expiresAt',
  'tokenType',
  'scope',
  'idToken',
  'sessionState',
] as const) {}
