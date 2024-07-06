import { Field, ObjectType } from '@nestjs/graphql';
import { PostResponse } from '@lib/domains/post/application/dtos/post.response';
import { ThreadPreviewResponse } from './thread-preview.response';

@ObjectType()
export class ThreadResponse extends ThreadPreviewResponse {
  @Field(() => PostResponse)
  declare post: PostResponse;

  constructor(partial: Partial<ThreadPreviewResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
