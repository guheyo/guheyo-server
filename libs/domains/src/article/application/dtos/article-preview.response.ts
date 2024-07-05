import { PostPreviewWithAuthorResponse } from '@lib/domains/post/application/dtos/post-preview-with-author.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArticlePreviewResponse {
  @Field(() => PostPreviewWithAuthorResponse)
  post: PostPreviewWithAuthorResponse;

  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  content: string | null;

  constructor(partial: Partial<ArticlePreviewResponse>) {
    Object.assign(this, partial);
  }
}
