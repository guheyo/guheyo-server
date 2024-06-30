import { Field, ObjectType } from '@nestjs/graphql';
import { PostResponse } from '@lib/domains/post/application/dtos/post.response';
import { ArticlePreviewResponse } from './article-preview.response';

@ObjectType()
export class ArticleResponse extends ArticlePreviewResponse {
  @Field(() => PostResponse)
  declare post: PostResponse;

  constructor(partial: Partial<ArticlePreviewResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
