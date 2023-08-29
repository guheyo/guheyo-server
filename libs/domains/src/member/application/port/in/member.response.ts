import { OmitType } from '@nestjs/swagger';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';

export class MemberResponse extends OmitType(MemberEntity, [
  'id',
  'updatedAt',
  'deletedAt',
] as const) {}
