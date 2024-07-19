import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindBidsWhereInput } from './find-bids-where.input';
import { FindBidsOrderByInput } from './find-bids-order-by.input';

@ArgsType()
export class FindBidsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindBidsWhereInput)
  @Field(() => FindBidsWhereInput, { nullable: true })
  where?: FindBidsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindBidsOrderByInput)
  @Field(() => FindBidsOrderByInput, { nullable: true })
  orderBy?: FindBidsOrderByInput;
}
