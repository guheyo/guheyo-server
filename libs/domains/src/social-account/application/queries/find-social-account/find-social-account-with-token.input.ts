import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindSocialAccountWithTokenInput {
  @Field()
  provider: string;

  @Field()
  socialId: string;

  @Field()
  refreshToken: string;
}
