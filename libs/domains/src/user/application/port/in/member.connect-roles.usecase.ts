import { MemberResponse } from './member.response';

export interface MemberConnectRolesUseCase {
  connectRoles(id: string, roleIds: string[]): Promise<MemberResponse>;
}
