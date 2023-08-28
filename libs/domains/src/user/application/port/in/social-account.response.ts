import { OmitType } from '@nestjs/swagger';
import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';

export class SocialAccountResponse extends OmitType(SocialAccountEntity, [
  'id',
  'updatedAt',
  'deletedAt',
] as const) {}
