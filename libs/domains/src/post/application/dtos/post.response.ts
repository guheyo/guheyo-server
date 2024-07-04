import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { PostPreviewWithAuthorResponse } from './post-preview-with-author.response';

@ObjectType()
export class PostResponse extends PostPreviewWithAuthorResponse {
  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  @Field(() => Int)
  reportCount: number;

  constructor(partial: Partial<PostResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
