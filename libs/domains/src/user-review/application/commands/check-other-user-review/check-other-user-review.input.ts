import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CheckOtherUserReviewInput {
  @IsUUID()
  @Field(() => ID)
  sourceUserReviewId: string;

  @IsString()
  @Field(() => String)
  reviewStatus: string;
}
