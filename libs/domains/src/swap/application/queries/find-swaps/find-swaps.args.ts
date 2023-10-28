import { PaginationArgs } from '@lib/shared/cqrs/queries/pagination/pagination.args';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class FindSwapsArgs extends PaginationArgs {
  @IsString()
  @Field(() => ID)
  productCategoryId: string;
}
