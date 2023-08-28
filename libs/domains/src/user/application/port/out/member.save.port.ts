import { MemberEntity } from '@lib/domains/user/domain/member.entity';

export interface MemberSavePort {
  create(member: MemberEntity): Promise<MemberEntity>;
}
