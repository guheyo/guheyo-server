import { Field, ObjectType } from '@nestjs/graphql';
import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { CategoryResponse } from '@lib/domains/group/application/dtos/category.response';
import { BrandBaseResponse } from './brand-base.response';

@ObjectType()
export class BrandPreviewResponse extends BrandBaseResponse {
  @Field(() => Boolean, { nullable: true })
  followed?: boolean;

  @Field(() => [GroupProfileResponse])
  groups: GroupProfileResponse[];

  @Field(() => [CategoryResponse])
  categories: CategoryResponse[];

  constructor(partial: Partial<BrandPreviewResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
