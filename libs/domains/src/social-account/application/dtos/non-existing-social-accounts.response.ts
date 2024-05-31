import { Field, ObjectType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { SocialUserResponse } from './social-user.response';

@ObjectType()
export class NonExistingSocialAccountsResponse {
  @ValidateNested()
  @Field(() => [SocialUserResponse])
  socialUsers: SocialUserResponse[];

  constructor(partial: Partial<NonExistingSocialAccountsResponse>) {
    Object.assign(this, partial);
  }
}
