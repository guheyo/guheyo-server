import { ApiProperty } from '@nestjs/swagger';
import { Member } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class MemberEntity implements Member {
  constructor(partial: Partial<MemberEntity>) {
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

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  guildId: string;

  @Type(() => RoleEntity)
  @ApiProperty({ isArray: true, type: () => RoleEntity })
  roles: RoleEntity[];
}
