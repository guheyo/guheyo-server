import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SignInUserInput {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  avatarURL?: string;

  @IsString()
  provider: string;

  @IsUUID()
  socialId: string;

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;
}
