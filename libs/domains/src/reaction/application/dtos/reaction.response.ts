import { EmojiResponse } from '@lib/domains/emoji/application/dtos/emoji.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReactionResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  canceledAt: Date | null;

  @Field(() => EmojiResponse)
  emoji: EmojiResponse;

  @Field(() => ID)
  userId: string;

  @Field(() => ID, { nullable: true })
  postId: string | null;

  @Field(() => ID, { nullable: true })
  commentId: string | null;

  constructor(partial: Partial<ReactionResponse>) {
    Object.assign(this, partial);
  }
}
