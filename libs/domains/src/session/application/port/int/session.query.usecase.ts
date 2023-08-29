import { SessionAndUserResponse } from './session.session-and-user.response';

export interface SessionQueryUseCase {
  getSessionAndUser(userId: string, sessionToken: string): Promise<SessionAndUserResponse | null>;
}
