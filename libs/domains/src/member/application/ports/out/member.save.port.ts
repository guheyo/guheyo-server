import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SavePort } from '@lib/shared/cqrs/ports/save.port';

export interface MemberSavePort extends SavePort<MemberEntity> {}
