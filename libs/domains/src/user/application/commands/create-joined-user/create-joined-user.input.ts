import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJoinedUserInput {
  @IsUUID()
  userId: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  avatarURL?: string;

  @IsString()
  socialAccountId: string;

  @IsString()
  provider: string;

  @IsString()
  socialId: string;

  @IsString()
  guildId: string;

  @IsString()
  memberId: string;

  @IsString({ each: true })
  roleIds: string[];
}
