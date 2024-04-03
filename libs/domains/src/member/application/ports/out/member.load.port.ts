import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { LoadPort } from '@lib/shared/cqrs/ports/load.port';

export interface MemberLoadPort extends LoadPort<MemberEntity> {
  find(groupId: string, userId: string): Promise<MemberEntity | null>;
}
