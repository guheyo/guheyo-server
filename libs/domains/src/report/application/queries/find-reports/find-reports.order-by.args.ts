import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindReportsOrderByArgs {
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';
}
