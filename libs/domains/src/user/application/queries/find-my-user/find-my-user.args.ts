import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindMyUserArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  provider?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  socialId?: string;
}
