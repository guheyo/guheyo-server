import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class PostPreviewWithoutUserResponse {
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

  @Field(() => String, { nullable: true })
  categoryId: string | null;

  @Field(() => Int)
  reportCount: number;

  @Field(() => Int)
  reportCommentCount: number;

  constructor(partial: Partial<PostPreviewWithoutUserResponse>) {
    Object.assign(this, partial);
  }
}
