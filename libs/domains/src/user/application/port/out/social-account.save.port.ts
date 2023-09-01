import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';

export interface SocialAccountSavePort {
  create(socialAccount: SocialAccountEntity): Promise<void>;
  update(socialAccount: SocialAccountEntity): Promise<void>;
  delete(userId: string, provider: string, socialId: string): Promise<void>;
}
