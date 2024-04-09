import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CheckOtherDealReviewInput {
  @IsUUID()
  @Field(() => ID)
  sourceDealReviewId: string;

  @IsUUID()
  @Field(() => ID)
  refId: string;

  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsUUID()
  @Field(() => ID)
  revieweeId: string;

  @IsString()
  @Field(() => String)
  reviewStatus: string;
}
