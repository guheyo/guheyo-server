import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@ArgsType()
export class FindDemandPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  productCategoryId?: string;

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  buyerId?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status?: string;
}