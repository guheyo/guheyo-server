import { MemberCreateRequest } from './member.create.request';
import { MemberResponse } from './member.response';

export interface MemberCommandUseCase {
  create(request: MemberCreateRequest): Promise<MemberResponse>;
  delete(userId: string, guildId: string): void;
}
