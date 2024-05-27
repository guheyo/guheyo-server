import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentCountResponse {
  @Field(() => ID)
  postId: string;

  @Field(() => Int)
  count: number;

  constructor(partial: Partial<CommentCountResponse>) {
    Object.assign(this, partial);
  }
}
