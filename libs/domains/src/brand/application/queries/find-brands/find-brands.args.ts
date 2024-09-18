import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindBrandsWhereInput } from './find-brands-where.input';
import { FindBrandsOrderByInput } from './find-brands-order-by.input';

@ArgsType()
export class FindBrandsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindBrandsWhereInput)
  @Field(() => FindBrandsWhereInput, { nullable: true })
  where?: FindBrandsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindBrandsOrderByInput)
  @Field(() => FindBrandsOrderByInput, { nullable: true })
  orderBy?: FindBrandsOrderByInput;
}
