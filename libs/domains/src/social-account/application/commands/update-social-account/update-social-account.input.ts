import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateSocialAccountInput {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  provider?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  socialId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  expiresAt?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  tokenType?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  scope?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  idToken?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  sessionState?: string;
}
