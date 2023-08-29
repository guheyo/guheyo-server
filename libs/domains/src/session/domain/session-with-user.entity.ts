import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@lib/domains/user/domain/user.entity';
import { SessionEntity } from './session.entity';

export class SessionWithUserEntity extends SessionEntity {
  @ApiProperty({ type: () => UserEntity })
  user: UserEntity;
}
