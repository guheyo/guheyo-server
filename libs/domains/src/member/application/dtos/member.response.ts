import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MemberResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  userId: string;

  @Field(() => GroupProfileResponse)
  group: GroupProfileResponse;

  constructor(partial: Partial<MemberResponse>) {
    Object.assign(this, partial);
  }
}
