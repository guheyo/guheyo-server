import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { PostPreviewWithoutUserResponse } from './post-preview-without-user.response';

@ObjectType()
export class PostPreviewWithUserResponse extends PostPreviewWithoutUserResponse {
  @Field(() => UserResponse)
  user: UserResponse;

  constructor(partial: Partial<PostPreviewWithUserResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
