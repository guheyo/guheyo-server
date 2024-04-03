import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SocialAccountWithoutAuthResponse } from './social-account.without-auth.response';

@ObjectType()
export class SocialAccountResponse extends SocialAccountWithoutAuthResponse {
  @Field(() => String, { nullable: true })
  refreshToken: string | null;

  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => Int, { nullable: true })
  expiresAt: number | null;

  @Field(() => String, { nullable: true })
  tokenType: string | null;

  @Field(() => String, { nullable: true })
  scope: string | null;

  @Field(() => String, { nullable: true })
  idToken: string | null;

  @Field(() => String, { nullable: true })
  sessionState: string | null;

  constructor(partial: Partial<SocialAccountResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
