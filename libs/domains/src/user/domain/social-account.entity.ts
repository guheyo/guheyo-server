import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SocialAccount } from '@prisma/client';

export class SocialAccountEntity implements SocialAccount {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: Date })
  deletedAt: Date | null;

  @ApiProperty({ type: String })
  provider: string;

  @ApiProperty({ type: String })
  socialId: string;

  @ApiProperty({ type: String })
  userId: string;

  @ApiPropertyOptional({ type: String })
  refreshToken: string | null;

  @ApiPropertyOptional({ type: String })
  accessToken: string | null;

  @ApiPropertyOptional({ type: Number })
  expiresAt: number | null;

  @ApiPropertyOptional({ type: String })
  tokenType: string | null;

  @ApiPropertyOptional({ type: String })
  scope: string | null;

  @ApiPropertyOptional({ type: String })
  idToken: string | null;

  @ApiPropertyOptional({ type: String })
  sessionState: string | null;
}
