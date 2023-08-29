import { SessionEntity } from '@lib/domains/session/domain/session.entity';

export interface SessionSavePort {
  create(session: SessionEntity): Promise<SessionEntity>;
  update(session: SessionEntity): Promise<SessionEntity>;
  delete(sessionToken: string): Promise<SessionEntity>;
}
