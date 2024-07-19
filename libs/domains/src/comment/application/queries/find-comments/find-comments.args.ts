import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindCommentsOrderByInput } from './find-comments-order-by.input';
import { FindCommentsWhereInput } from './find-comments-where.input';

@ArgsType()
export class FindCommentsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindCommentsWhereInput)
  @Field(() => FindCommentsWhereInput, { nullable: true })
  where?: FindCommentsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindCommentsOrderByInput)
  @Field(() => FindCommentsOrderByInput, { nullable: true })
  orderBy?: FindCommentsOrderByInput;
}
