import { EmojiResponse } from '@lib/domains/emoji/application/dtos/emoji.response';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReactionSummaryResponse {
  @Field(() => EmojiResponse)
  emoji: EmojiResponse;

  @Field(() => Int)
  count: number;

  @Field(() => Boolean)
  me: boolean;

  @Field(() => ID)
  postId: string;

  @Field(() => ID, { nullable: true })
  commentId: string | null;

  constructor(partial: Partial<ReactionSummaryResponse>) {
    Object.assign(this, partial);
  }
}
