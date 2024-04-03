import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindMyUserArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID)
  userId?: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  provider?: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  socialId?: string;
}
