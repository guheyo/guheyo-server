import { MemberResponse } from './member.response';

export interface MemberDisconnectRolesUseCase {
  disconnectRoles(id: string, roleIds: string[]): Promise<MemberResponse>;
}
