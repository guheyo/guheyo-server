import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class RoleEntity implements Role {
  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updateedAt: Date;

  @Exclude()
  deletedAt: Date | null;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: Number })
  rank: number | null;

  @ApiProperty({ type: String })
  hexColor: string = '#000000';
}
