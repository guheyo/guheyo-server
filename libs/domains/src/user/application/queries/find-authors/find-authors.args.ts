import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindAuthorsWhereInput } from './find-authors-where.input';
import { FindAuthorsOrderByInput } from './find-authors-order-by.input';

@ArgsType()
export class FindAuthorsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindAuthorsWhereInput)
  @Field(() => FindAuthorsWhereInput, { nullable: true })
  where?: FindAuthorsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindAuthorsOrderByInput)
  @Field(() => FindAuthorsOrderByInput, { nullable: true })
  orderBy?: FindAuthorsOrderByInput;
}
