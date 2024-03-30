import { MemberRoleResponse } from '@lib/domains/member/application/dtos/member-role.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserResponse {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  avatarURL: string | null;

  @Field()
  bot: boolean;

  @Field(() => [MemberRoleResponse])
  memberRoles: MemberRoleResponse[];

  constructor(partial: Partial<AuthUserResponse>) {
    Object.assign(this, partial);
  }
}
