import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { SocialAccountDeleteCommand } from '../../commands/social-account-delete/social-account.delete.command';

export interface SocialAccountSavePort {
  create(socialAccount: SocialAccountEntity): Promise<void>;
  update(socialAccount: SocialAccountEntity): Promise<void>;
  delete(command: SocialAccountDeleteCommand): Promise<void>;
}
