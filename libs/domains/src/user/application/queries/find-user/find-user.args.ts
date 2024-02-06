import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindUserArgs {
  @IsOptional()
  @IsString()
  @Field()
  provider?: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  socialId?: string;

  @IsOptional()
  @IsString()
  @Field()
  sessionToken?: string;
}
