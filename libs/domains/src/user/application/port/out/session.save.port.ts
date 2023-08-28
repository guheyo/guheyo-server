import { SessionEntity } from '@lib/domains/user/domain/session.entity';

export interface SessionSavePort {
  create(session: SessionEntity): Promise<SessionEntity>;
  update(session: SessionEntity): Promise<SessionEntity>;
  delete(userId: string, sessionToken: string): Promise<SessionEntity>;
}
