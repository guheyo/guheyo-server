import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Member } from '@prisma/client';
import { RoleEntity } from './role.entity';

export class MemberEntity implements Member {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt: Date | null;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  guildId: string;

  @ApiProperty({ isArray: true, type: () => RoleEntity })
  roles: RoleEntity[];
}
