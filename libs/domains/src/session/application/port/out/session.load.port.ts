import { SessionWithUserEntity } from '@lib/domains/session/domain/session-with-user.entity';

export interface SessionLoadPort {
  getSessionWithUser(sessionToken: string): Promise<SessionWithUserEntity | null>;
}
