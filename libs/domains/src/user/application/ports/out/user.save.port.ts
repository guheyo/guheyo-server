import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface UserSavePort extends SavePort<UserEntity> {}
