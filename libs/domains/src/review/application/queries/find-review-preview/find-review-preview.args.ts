import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindReviewPreviewArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  id?: string;
}
