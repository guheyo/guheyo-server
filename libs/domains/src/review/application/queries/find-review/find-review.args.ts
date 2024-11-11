import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindReviewArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  id?: string;
}
