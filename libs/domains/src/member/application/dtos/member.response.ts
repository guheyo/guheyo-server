import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MemberResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  userId: string;

  @Field()
  groupId: string;

  constructor(partial: Partial<MemberResponse>) {
    Object.assign(this, partial);
  }
}
