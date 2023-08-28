import { SessionCreateRequest } from './session.create.request';
import { SessionResponse } from './session.response';

export interface SocialAccountCommandUseCase {
  create(request: SessionCreateRequest): Promise<SessionResponse>;
  delete(userId: string, provider: string, socialId: string): Promise<SessionResponse>;
}
