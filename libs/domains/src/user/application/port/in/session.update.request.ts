import { PickType } from '@nestjs/swagger';
import { SessionEntity } from '@lib/domains/user/domain/session.entity';

export class SessionUpdateRequest extends PickType(SessionEntity, [
  'sessionToken',
  'expires',
  'userId',
] as const) {}
