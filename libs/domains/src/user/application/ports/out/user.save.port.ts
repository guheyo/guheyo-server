import { SocialAccountEntity } from '@lib/domains/social-account/domain/social-account.entity';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface UserSavePort extends SavePort<UserEntity> {
  connectRoles: ({
    userId,
    roleIds,
    roleNames,
  }: {
    userId: string;
    roleIds: string[];
    roleNames: string[];
  }) => void;
  disconnectRoles: ({
    userId,
    roleIds,
    roleNames,
  }: {
    userId: string;
    roleIds: string[];
    roleNames: string[];
  }) => void;
  signInUser: (user: UserEntity, socialAccount: SocialAccountEntity) => void;
}
