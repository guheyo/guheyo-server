import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from './pagination.args';

@ArgsType()
export class PaginationSearchArgs extends PaginationArgs {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  keyword?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  distinct?: boolean;
}
