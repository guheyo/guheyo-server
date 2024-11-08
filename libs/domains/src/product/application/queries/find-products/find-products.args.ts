import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindProductsWhereInput } from './find-products-where.input';
import { FindProductsOrderByInput } from './find-products-order-by.input';

@ArgsType()
export class FindProductsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindProductsWhereInput)
  @Field(() => FindProductsWhereInput, { nullable: true })
  where?: FindProductsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindProductsOrderByInput)
  @Field(() => FindProductsOrderByInput, { nullable: true })
  orderBy?: FindProductsOrderByInput;
}
