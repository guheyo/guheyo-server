import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface UserLoadPort extends LoadPort<UserEntity> {
  findBySocialAccount(provider: string, socialId: string): Promise<UserEntity | null>;
}
