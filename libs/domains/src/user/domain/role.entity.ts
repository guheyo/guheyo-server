import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updateedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt: Date | null;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: Number })
  rank: number | null;

  @ApiProperty({ type: String })
  hexColor: string = '#000000';
}
