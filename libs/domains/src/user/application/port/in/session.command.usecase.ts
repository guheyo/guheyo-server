import { SessionCreateRequest } from './session.create.request';
import { SessionUpdateRequest } from './session.update.request';
import { SessionResponse } from './session.response';

export interface SessionCommandUseCase {
  create(sessionCreateRequest: SessionCreateRequest): Promise<SessionResponse>;
  update(sessionUpdateRequest: SessionUpdateRequest): Promise<SessionResponse>;
  delete(userId: string, sessionToken: string): void;
}
