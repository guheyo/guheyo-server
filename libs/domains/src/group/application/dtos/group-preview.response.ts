import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { OfferPreviewResponse } from '@lib/domains/offer/application/dtos/offer-preview.response';

@ObjectType()
export class GroupPreviewResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  icon: string | null;

  @Field(() => Int)
  position: number;

  @Field(() => [OfferPreviewResponse])
  sells: OfferPreviewResponse[];

  @Field(() => [OfferPreviewResponse])
  buys: OfferPreviewResponse[];

  constructor(partial: Partial<GroupPreviewResponse>) {
    Object.assign(this, partial);
  }
}
