import { SessionCreateRequest } from './session.create.request';
import { SessionUpdateRequest } from './session.update.request';
import { SessionResponse } from './session.response';

export interface SessionCommandUseCase {
  create(request: SessionCreateRequest): Promise<SessionResponse>;
  update(request: SessionUpdateRequest): Promise<SessionResponse>;
  delete(userId: string, sessionToken: string): void;
}
