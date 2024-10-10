import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { FindGroupProfilesWhereInput } from './find-group-profiles-where.input';
import { FindGroupProfilesOrderByInput } from './find-group-profiles-order-by.input';

@ArgsType()
export class FindGroupProfilesArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindGroupProfilesWhereInput)
  @Field(() => FindGroupProfilesWhereInput, { nullable: true })
  where?: FindGroupProfilesWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindGroupProfilesOrderByInput)
  @Field(() => FindGroupProfilesOrderByInput, { nullable: true })
  orderBy?: FindGroupProfilesOrderByInput;
}
