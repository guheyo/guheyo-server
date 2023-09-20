import { IsString, IsUUID } from 'class-validator';

export class JoinedUserCreatedInput {
  @IsUUID()
  userId: string;

  @IsUUID()
  socialAccountId: string;

  @IsString()
  provider: string;

  @IsString()
  socialId: string;

  @IsUUID()
  guildId: string;

  @IsUUID()
  memberId: string;

  @IsString({ each: true })
  roleIds: string[];
}
