import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  position: number;

  @Field()
  hexColor: string;

  @Field(() => ID, { nullable: true })
  groupId: string | null;

  constructor(partial: Partial<RoleResponse>) {
    Object.assign(this, partial);
  }
}
