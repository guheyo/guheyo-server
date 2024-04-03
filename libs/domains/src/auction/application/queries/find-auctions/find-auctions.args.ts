import { PaginationArgs } from '@lib/shared/cqrs/queries/pagination/pagination.args';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindAuctionsArgs extends PaginationArgs {
  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  productCategoryId?: string;
}
