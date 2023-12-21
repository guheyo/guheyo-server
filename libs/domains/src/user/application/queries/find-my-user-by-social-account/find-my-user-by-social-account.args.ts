import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class FindMyUserBySocialAccountArgs {
  @IsString()
  @Field()
  provider: string;

  @IsString()
  @Field(() => String)
  socialId: string;
}
