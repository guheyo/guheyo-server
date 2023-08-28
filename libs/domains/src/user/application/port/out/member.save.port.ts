import { MemberEntity } from '@lib/domains/user/domain/member.entity';

export interface MemberSavePort {
  create(member: MemberEntity): Promise<MemberEntity>;
  connectRoles(id: string, roleIds: string[]): Promise<MemberEntity>;
  disconnectRoles(id: string, roleIds: string[]): Promise<MemberEntity>;
}
