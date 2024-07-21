import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindOfferPreviewsWhereInput } from './find-offer-previews-where.input';
import { FindOfferPreviewsOrderByInput } from './find-offer-previews-order-by.input';

@ArgsType()
export class FindOfferPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindOfferPreviewsWhereInput)
  @Field(() => FindOfferPreviewsWhereInput, { nullable: true })
  where?: FindOfferPreviewsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindOfferPreviewsOrderByInput)
  @Field(() => FindOfferPreviewsOrderByInput, { nullable: true })
  orderBy?: FindOfferPreviewsOrderByInput;
}
