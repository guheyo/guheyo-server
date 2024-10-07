import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindThreadPreviewArgs extends PaginationSearchArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  slug?: string;
}
