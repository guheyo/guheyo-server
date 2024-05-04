import { Field, ObjectType } from '@nestjs/graphql';
import { ReactionSummaryResponse } from '@lib/domains/reaction/application/dtos/reaction-summary.response';
import { PostResponse } from './post.response';

@ObjectType()
export class PostWithReactionsResponse extends PostResponse {
  @Field(() => [ReactionSummaryResponse])
  reactions: ReactionSummaryResponse[];

  constructor(partial: Partial<PostWithReactionsResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
