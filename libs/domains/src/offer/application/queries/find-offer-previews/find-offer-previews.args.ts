import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindOffersWhereInput } from './find-offers-where.input';
import { FindOffersOrderByInput } from './find-offers-order-by.input';

@ArgsType()
export class FindOfferPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindOffersWhereInput)
  @Field(() => FindOffersWhereInput, { nullable: true })
  where?: FindOffersWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindOffersOrderByInput)
  @Field(() => FindOffersOrderByInput, { nullable: true })
  orderBy?: FindOffersOrderByInput;
}
