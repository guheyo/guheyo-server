import { BrandBaseResponse } from '@lib/domains/brand/application/dtos/brand-base.response';
import { CategoryResponse } from '@lib/domains/group/application/dtos/category.response';
import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { TagResponse } from '@lib/domains/tag/application/dtos/tag.response';
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

  @Field(() => GroupProfileResponse)
  group: GroupProfileResponse;

  @Field(() => CategoryResponse, { nullable: true })
  category: CategoryResponse | null;

  @Field(() => [TagResponse])
  tags: TagResponse[];

  @Field(() => [BrandBaseResponse])
  brands: BrandBaseResponse[];

  @Field(() => Int, { nullable: true })
  commentCount: number | null;

  constructor(partial: Partial<PostPreviewWithoutUserResponse>) {
    Object.assign(this, partial);
  }
}
