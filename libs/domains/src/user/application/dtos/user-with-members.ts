import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { MemberWithRolesResponse } from '@lib/domains/member/application/dtos/member-with-roles.response';
import { UserResponse } from './user.response';

@ObjectType()
export class UserWithMembersResponse extends UserResponse {
  @Type(() => MemberWithRolesResponse)
  @Field(() => [MemberWithRolesResponse], { nullable: true })
  members: MemberWithRolesResponse[];

  constructor(partial: Partial<UserWithMembersResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
