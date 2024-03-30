import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MemberRoleResponse {
  @Field(() => String)
  groupSlug: string;

  @Field(() => [String])
  roleNames: string[];

  constructor(partial: Partial<MemberRoleResponse>) {
    Object.assign(this, partial);
  }
}
