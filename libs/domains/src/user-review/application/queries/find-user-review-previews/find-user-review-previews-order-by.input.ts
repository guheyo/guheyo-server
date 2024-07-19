import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindUserReviewPreviewsOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';
}
