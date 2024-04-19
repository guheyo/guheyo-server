import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';

@ObjectType()
export class PostPreviewResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  archivedAt: Date | null;

  @Field(() => String, { nullable: true })
  pending: string | null;

  @Field()
  type: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @Field(() => String, { nullable: true })
  thumbnail: string | null;

  @Field()
  groupId: string;

  @Field()
  categoryId: string;

  @Field(() => UserResponse)
  user: UserResponse;

  @Field(() => Int)
  reportCount: number;

  @Field(() => Int)
  reportCommentCount: number;

  constructor(partial: Partial<PostPreviewResponse>) {
    Object.assign(this, partial);
  }
}
