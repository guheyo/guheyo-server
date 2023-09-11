import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { SocialAccountResponse } from '@lib/domains/social-account/application/dtos/social-account.reponse';
import { MemberReponse } from '@lib/domains/member/application/dtos/member.reponse';
import { UserReponse } from './user.reponse';

@ObjectType()
export class LoginUserResponse extends UserReponse {
  @Type(() => SocialAccountResponse)
  @Field(() => [SocialAccountResponse], { nullable: true })
  socialAccounts: SocialAccountResponse[];

  @Type(() => MemberReponse)
  @Field(() => [MemberReponse], { nullable: true })
  members: MemberReponse[];

  constructor(partial: Partial<LoginUserResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
