import { EmojiResponse } from '@lib/domains/emoji/application/dtos/emoji.response';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReactionSummaryResponse {
  @Field(() => EmojiResponse)
  emoji: EmojiResponse;

  @Field(() => Int)
  count: number;

  @Field(() => Boolean)
  me: boolean;

  constructor(partial: Partial<ReactionSummaryResponse>) {
    Object.assign(this, partial);
  }
}
