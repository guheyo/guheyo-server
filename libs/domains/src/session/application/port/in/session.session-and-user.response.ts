import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '@lib/domains/user/application/port/in/user.response';
import { SessionResponse } from './session.response';

export class SessionAndUserResponse {
  @ApiProperty({ type: () => SessionResponse })
  session: SessionResponse;

  @ApiProperty({ type: () => UserResponse })
  user: UserResponse;
}
