import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { FindCategoriesWhereInput } from './find-categories-where.input';
import { FindCategoriesOrderByInput } from './find-categories-order-by.input';

@ArgsType()
export class FindCategoriesArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindCategoriesWhereInput)
  @Field(() => FindCategoriesWhereInput, { nullable: true })
  where?: FindCategoriesWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindCategoriesOrderByInput)
  @Field(() => FindCategoriesOrderByInput, { nullable: true })
  orderBy?: FindCategoriesOrderByInput;
}
