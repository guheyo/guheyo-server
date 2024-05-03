import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmojiResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => Int)
  position: number;

  @Field(() => ID, { nullable: true })
  groupId?: string;

  constructor(partial: Partial<EmojiResponse>) {
    Object.assign(this, partial);
  }
}
