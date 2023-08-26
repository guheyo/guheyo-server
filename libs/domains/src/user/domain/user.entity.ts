import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { SocialAccountEntity } from './social-account.entity';
import { MemberEntity } from './member.entity';

export class UserEntity implements User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt: Date | null;

  @ApiPropertyOptional({ type: String })
  name: string | null;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ isArray: true, type: () => SocialAccountEntity })
  socialAccounts: SocialAccountEntity[];

  @ApiPropertyOptional({ type: String })
  avatarURL: string | null;

  @ApiProperty({ type: Boolean })
  bot: boolean;

  @ApiProperty({ isArray: true, type: () => MemberEntity })
  members: MemberEntity[];
}
