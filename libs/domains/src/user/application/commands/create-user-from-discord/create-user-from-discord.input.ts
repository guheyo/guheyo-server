import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserFromDiscordInput {
  @IsUUID()
  id: string;

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
  groupId: string;

  @IsUUID()
  memberId: string;

  @IsString({ each: true })
  roleIds: string[];
}
