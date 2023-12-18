import { Field, ObjectType } from '@nestjs/graphql';
import { SocialAccountWithoutAuthResponse } from '@lib/domains/social-account/application/dtos/social-account.without-auth.response';
import { Type } from 'class-transformer';
import { UserWithMembersResponse } from './user-with-members';

@ObjectType()
export class AuthorResponse extends UserWithMembersResponse {
  @Type(() => SocialAccountWithoutAuthResponse)
  @Field(() => [SocialAccountWithoutAuthResponse])
  socialAccounts: SocialAccountWithoutAuthResponse[];

  constructor(partial: Partial<AuthorResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
