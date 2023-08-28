import { SessionEntity } from '@lib/domains/user/domain/session.entity';

export interface SessionLoadPort {
  getBySessionToken(userId: string, sessionToken: string): Promise<SessionEntity | null>;
}
