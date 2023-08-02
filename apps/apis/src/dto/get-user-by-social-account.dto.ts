import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserBySocialAccountDto {
  @ApiProperty({
    description: 'provider',
    type: String,
  })
  @IsString()
  provider: string;

  @ApiProperty({
    description: '소셜 ID',
    type: String,
  })
  @IsString()
  socialId: string;
}
