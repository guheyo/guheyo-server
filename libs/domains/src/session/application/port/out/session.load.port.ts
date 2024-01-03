import { SessionEntity } from '@lib/domains/session/domain/session.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface SessionLoadPort extends LoadPort<SessionEntity> {
  findBySessionToken(sessionToken: string): Promise<SessionEntity | null>;
}
