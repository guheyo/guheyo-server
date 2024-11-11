import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindReviewsOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => Int, { nullable: true })
  rating?: 'asc' | 'desc';
}
