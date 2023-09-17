import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindMyUserBySocialAccountArgs {
  @IsString()
  @Field()
  provider: string;

  @IsUUID()
  @Field(() => ID)
  socialId: string;
}
