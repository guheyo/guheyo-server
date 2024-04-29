import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { IsOptional } from 'class-validator';
import { FindCommentsWhereArgs } from './find-comments-where.args';
import { FindCommentsOrderByArgs } from './find-comments-order-by.args';

@ArgsType()
export class FindCommentsArgs extends PaginationSearchArgs {
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  where?: FindCommentsWhereArgs;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  orderBy?: FindCommentsOrderByArgs;
}
