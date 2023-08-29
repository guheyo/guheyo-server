import { ApiProperty } from '@nestjs/swagger';
import { Session } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SessionEntity implements Session {
  constructor(partial: Partial<SessionEntity>) {
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
  sessionToken: string;

  @ApiProperty({ type: Date })
  expires: Date;

  @ApiProperty({ type: String })
  userId: string;
}
