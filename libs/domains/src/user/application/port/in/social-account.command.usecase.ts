import { SessionCreateRequest } from './session.create.request';
import { SessionResponse } from './session.response';

export interface SocialAccountCommandUseCase {
  create(sessionCreateRequest: SessionCreateRequest): Promise<SessionResponse>;
  delete(userId: string, provider: string, socialId: string): Promise<SessionResponse>;
}
