import { PickType } from '@nestjs/swagger';
import { MemberEntity } from '@lib/domains/user/domain/member.entity';

export class MemberCreateRequest extends PickType(MemberEntity, ['userId', 'guildId'] as const) {}
