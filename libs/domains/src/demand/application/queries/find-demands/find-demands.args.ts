import { PaginationArgs } from '@lib/shared/cqrs/queries/pagination/pagination.args';
import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@ArgsType()
export class FindDemandsArgs extends PaginationArgs {
  @IsString()
  @Field(() => ID)
  productCategoryId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status?: string;
}
