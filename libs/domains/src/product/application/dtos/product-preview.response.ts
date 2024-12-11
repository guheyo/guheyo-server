import { Field, ObjectType } from '@nestjs/graphql';
import { BrandBaseResponse } from '@lib/domains/brand/application/dtos/brand-base.response';
import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { CategoryResponse } from '@lib/domains/group/application/dtos/category.response';
import { ProductBaseResponse } from './product-base.response';

@ObjectType()
export class ProductPreviewResponse extends ProductBaseResponse {
  @Field(() => GroupProfileResponse)
  group: GroupProfileResponse;

  @Field(() => CategoryResponse)
  category: CategoryResponse;

  @Field(() => BrandBaseResponse)
  brand: BrandBaseResponse;

  // TODO: thumbnail

  constructor(partial: Partial<ProductPreviewResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
