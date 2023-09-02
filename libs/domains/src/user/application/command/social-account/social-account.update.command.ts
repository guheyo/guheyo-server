import { PickType } from '@nestjs/swagger';
import { ICommand } from '@nestjs/cqrs';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';

export class SocialAccountUpdateCommand
  extends PickType(SocialAccountEntity, [
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
  ] as const)
  implements ICommand {}
