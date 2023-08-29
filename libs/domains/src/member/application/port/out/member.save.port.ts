import { MemberEntity } from '@lib/domains/member/domain/member.entity';

export interface MemberSavePort {
  create(member: MemberEntity): Promise<MemberEntity>;
  delete(userId: string, guildId: string): void;
  connectRoles(id: string, roleIds: string[]): Promise<MemberEntity>;
  disconnectRoles(id: string, roleIds: string[]): Promise<MemberEntity>;
}
