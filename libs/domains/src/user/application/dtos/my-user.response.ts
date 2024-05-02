import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { SocialAccountResponse } from '@lib/domains/social-account/application/dtos/social-account.response';
import { UserWithRolesResponse } from './user-with-roles';

@ObjectType()
export class MyUserResponse extends UserWithRolesResponse {
  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  phoneNumber: string | null;

  @Type(() => SocialAccountResponse)
  @Field(() => [SocialAccountResponse])
  socialAccounts: SocialAccountResponse[];

  constructor(partial: Partial<MyUserResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
