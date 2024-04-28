import { PostPreviewWithAuthorResponse } from '@lib/domains/post/application/dtos/post-preview-with-author.response';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class UserReviewPreviewResponse {
  @Field(() => PostPreviewWithAuthorResponse)
  post: PostPreviewWithAuthorResponse;

  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  type: string;

  @Field(() => AuthorResponse)
  reviewedUser: AuthorResponse;

  @Field(() => String, { nullable: true })
  offerId: string | null;

  @Field(() => String, { nullable: true })
  auctionId: string | null;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => Int)
  rating: Number;

  @Field()
  status: string;

  constructor(partial: Partial<UserReviewPreviewResponse>) {
    Object.assign(this, partial);
  }
}
