import { SocialAccountEntity } from '@lib/domains/user/domain/social-account.entity';
import { SocialAccountDeleteCommand } from '../../command/social-account-delete/social-account.delete.command';

export interface SocialAccountSavePort {
  create(socialAccount: SocialAccountEntity): Promise<void>;
  update(socialAccount: SocialAccountEntity): Promise<void>;
  delete(command: SocialAccountDeleteCommand): Promise<void>;
}
