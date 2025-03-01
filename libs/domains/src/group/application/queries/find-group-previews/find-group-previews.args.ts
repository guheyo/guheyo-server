import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { FindGroupPreviewsWhereInput } from './find-group-previews-where.input';
import { FindGroupPreviewsOrderByInput } from './find-group-previews-order-by.input';

@ArgsType()
export class FindGroupPreviewsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindGroupPreviewsWhereInput)
  @Field(() => FindGroupPreviewsWhereInput, { nullable: true })
  where?: FindGroupPreviewsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindGroupPreviewsOrderByInput)
  @Field(() => FindGroupPreviewsOrderByInput, { nullable: true })
  orderBy?: FindGroupPreviewsOrderByInput;
}
