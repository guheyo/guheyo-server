import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';

export interface SocialAccountSavePort {
  create(socialAccount: SocialAccountEntity): Promise<SocialAccountEntity>;
  delete(userId: string, provider: string, socialId: string): Promise<SocialAccountEntity>;
}
