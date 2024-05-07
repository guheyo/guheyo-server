import { Field, ObjectType } from '@nestjs/graphql';
import { ReactionResponse } from '@lib/domains/reaction/application/dtos/reaction.response';
import { PostResponse } from './post.response';

@ObjectType()
export class PostWithReactionsResponse extends PostResponse {
  @Field(() => [ReactionResponse])
  reactions: ReactionResponse[];

  constructor(partial: Partial<PostWithReactionsResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
