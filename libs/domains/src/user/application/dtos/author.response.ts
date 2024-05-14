import { Field, ObjectType } from '@nestjs/graphql';
import { SocialAccountWithoutAuthResponse } from '@lib/domains/social-account/application/dtos/social-account.without-auth.response';
import { Type } from 'class-transformer';
import { UserWithRolesResponse } from './user-with-roles';

@ObjectType()
export class AuthorResponse extends UserWithRolesResponse {
  @Type(() => SocialAccountWithoutAuthResponse)
  @Field(() => [SocialAccountWithoutAuthResponse])
  socialAccounts: SocialAccountWithoutAuthResponse[];

  constructor(partial: Partial<AuthorResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
