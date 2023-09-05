import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { SocialAccountDeleteCommand } from '../../command/social-account-delete/social-account.delete.command';

export interface SocialAccountSavePort {
  createSocialAccount(socialAccount: SocialAccountEntity): Promise<void>;
  updateSocialAccount(socialAccount: SocialAccountEntity): Promise<void>;
  deleteSocialAccount(command: SocialAccountDeleteCommand): Promise<void>;
}
