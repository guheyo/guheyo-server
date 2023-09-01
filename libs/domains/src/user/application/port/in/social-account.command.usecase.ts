import { SocialAccountCreateRequest } from './social-account.create.request';
import { SocialAccountResponse } from './social-account.response';

export interface SocialAccountCommandUseCase {
  create(request: SocialAccountCreateRequest): Promise<SocialAccountResponse>;
  delete(userId: string, provider: string, socialId: string): Promise<SocialAccountResponse>;
}
