import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJoinedUserInput {
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  avatarURL?: string;

  @IsUUID()
  socialAccountId: string;

  @IsString()
  provider: string;

  @IsUUID()
  socialId: string;

  @IsUUID()
  guildId: string;

  @IsUUID()
  memberId: string;

  @IsString({ each: true })
  roleIds: string[];
}
