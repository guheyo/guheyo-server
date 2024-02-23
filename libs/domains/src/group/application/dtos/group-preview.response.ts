import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { OfferPreviewResponse } from '@lib/domains/offer/application/dtos/offer-preview.response';
import { DemandPreviewResponse } from '@lib/domains/demand/application/dtos/demand-preview.response';

@ObjectType()
export class GroupPreviewResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  description: string | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  icon: string | null;

  @Field(() => Int, { nullable: true })
  position: number;

  @Field(() => [OfferPreviewResponse])
  offers: OfferPreviewResponse[];

  @Field(() => [DemandPreviewResponse])
  demands: DemandPreviewResponse[];

  constructor(partial: Partial<GroupPreviewResponse>) {
    Object.assign(this, partial);
  }
}
