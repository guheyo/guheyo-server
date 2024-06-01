import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class FindUserWithoutSocialAccountsCountArgs {
  @IsArray()
  @Field(() => [String])
  providers: string[];
}
