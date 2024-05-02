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
}
