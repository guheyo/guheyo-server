import { Field, ObjectType } from '@nestjs/graphql';
import { UserImageResponse } from '@lib/domains/user-image/application/dtos/user-image.response';
import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { CategoryResponse } from '@lib/domains/group/application/dtos/category.response';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { PostPreviewResponse } from './post-preview.response';

@ObjectType()
export class PostResponse extends PostPreviewResponse {
  @Field(() => [UserImageResponse])
  images: UserImageResponse[];

  @Field(() => GroupProfileResponse)
  group: GroupProfileResponse;

  @Field(() => CategoryResponse)
  category: CategoryResponse;

  @Field(() => AuthorResponse)
  user: AuthorResponse;

  constructor(partial: Partial<PostResponse>) {
    super(partial);
    Object.assign(this, partial);
    this.user = partial.user!;
  }
}
