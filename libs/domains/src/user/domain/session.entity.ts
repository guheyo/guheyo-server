import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Session } from '@prisma/client';

export class SessionEntity implements Session {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt: Date | null;

  @ApiProperty({ type: String })
  sessionToken: string;

  @ApiProperty({ type: Date })
  expires: Date;

  @ApiProperty({ type: String })
  userId: string;
}
