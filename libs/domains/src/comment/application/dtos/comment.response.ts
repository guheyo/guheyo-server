import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => ID, { nullable: true })
  parentId: string | null;

  @Field(() => ID)
  postId: string;

  @Field(() => String)
  content: string;

  constructor(partial: Partial<CommentResponse>) {
    Object.assign(this, partial);
  }
}
