import { Field, ObjectType } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { CategoryResponse } from '@lib/domains/group/application/dtos/category.response';
import { PostPreviewWithAuthorResponse } from './post-preview-with-author.response';

@ObjectType()
export class PostResponse extends PostPreviewWithAuthorResponse {
  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  @Field(() => GroupProfileResponse)
  group: GroupProfileResponse;

  @Field(() => CategoryResponse, { nullable: true })
  category: CategoryResponse | null;

  constructor(partial: Partial<PostResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
