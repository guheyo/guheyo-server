import { Field, ObjectType } from '@nestjs/graphql';
import { LinkResponse } from './link.response';
import { FollowBrandResponse } from './follow-brand.response';
import { BrandPreviewResponse } from './brand-preview.response';

@ObjectType()
export class BrandDetailResponse extends BrandPreviewResponse {
  @Field(() => [LinkResponse])
  links: LinkResponse[];

  @Field(() => [FollowBrandResponse])
  followBrands: FollowBrandResponse[];

  constructor(partial: Partial<BrandDetailResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
