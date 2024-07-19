import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindUsersWhereInput } from './find-users-where.input';
import { FindUsersOrderByInput } from './find-users-order-by.input';

@ArgsType()
export class FindUsersArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindUsersWhereInput)
  @Field(() => FindUsersWhereInput, { nullable: true })
  where?: FindUsersWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindUsersOrderByInput)
  @Field(() => FindUsersOrderByInput, { nullable: true })
  orderBy?: FindUsersOrderByInput;
}
