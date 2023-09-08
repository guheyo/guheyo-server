import { Field, InputType, ID, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class SocialAccountCreateInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  provider: string;

  @IsString()
  @Field()
  socialId: string;

  @IsString()
  @Field()
  userId: string;

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
