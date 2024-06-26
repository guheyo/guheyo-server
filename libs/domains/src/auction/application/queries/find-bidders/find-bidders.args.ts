import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindBiddersWhereInput } from './find-bidders-where.input';
import { FindBiddersOrderByInput } from './find-bidders-order-by.input';

@ArgsType()
export class FindBiddersArgs extends PaginationSearchArgs {
  @ValidateNested()
  @Type(() => FindBiddersWhereInput)
  @Field(() => FindBiddersWhereInput)
  where: FindBiddersWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindBiddersOrderByInput)
  @Field(() => FindBiddersOrderByInput, { nullable: true })
  orderBy?: FindBiddersOrderByInput;
}
