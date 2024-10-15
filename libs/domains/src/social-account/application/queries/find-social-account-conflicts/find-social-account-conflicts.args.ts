import { PaginationSearchArgs } from '@lib/shared/cqrs/queries/pagination/pagination-search.args';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FindSocialAccountConflictsWhereInput } from './find-social-account-conflicts-where.input';
import { FindSocialAccountConflictsOrderByInput } from './find-social-account-conflicts-order-by.input';

@ArgsType()
export class FindSocialAccountConflictsArgs extends PaginationSearchArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FindSocialAccountConflictsWhereInput)
  @Field(() => FindSocialAccountConflictsWhereInput, { nullable: true })
  where?: FindSocialAccountConflictsWhereInput;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindSocialAccountConflictsOrderByInput)
  @Field(() => FindSocialAccountConflictsOrderByInput, { nullable: true })
  orderBy?: FindSocialAccountConflictsOrderByInput;
}
