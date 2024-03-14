import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  type: string;

  @Field(() => ID, { nullable: true })
  parentId: string | null;

  @Field(() => ID, { nullable: true })
  postId: string | null;

  @Field(() => ID, { nullable: true })
  reportId: string | null;

  @Field(() => ID, { nullable: true })
  auctionId: string | null;

  @Field(() => String)
  content: string;

  constructor(partial: Partial<CommentResponse>) {
    Object.assign(this, partial);
  }
}
