import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';
import { CreateMembersOfUserInput } from '../../commands/create-members-of-user/create-members-of-user.input';

export interface MemberSavePort extends SavePort<MemberEntity> {
  createMembersOfUser(input: CreateMembersOfUserInput): Promise<void>;
}
