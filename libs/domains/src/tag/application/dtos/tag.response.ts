import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagResponse {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  position: number;

  constructor(partial: Partial<TagResponse>) {
    Object.assign(this, partial);
  }
}
