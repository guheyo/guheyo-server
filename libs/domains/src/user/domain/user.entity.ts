import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { MemberEntity } from '@lib/domains/member/domain/member.entity';
import { SocialAccountEntity } from './social-account.entity';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;

  @ApiPropertyOptional({ type: String })
  name: string | null;

  @ApiProperty({ type: String })
  username: string;

  @Type(() => SocialAccountEntity)
  @ApiProperty({ isArray: true, type: () => SocialAccountEntity })
  socialAccounts: SocialAccountEntity[];

  @ApiPropertyOptional({ type: String })
  avatarURL: string | null;

  @ApiProperty({ type: Boolean })
  bot: boolean;

  @Type(() => MemberEntity)
  @ApiProperty({ isArray: true, type: () => MemberEntity })
  members: MemberEntity[];
}
