import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CommentOfferReportInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  reportId: string;

  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsUUID()
  @Field(() => ID)
  offerId: string;

  @IsString()
  @Field()
  content: string;

  @IsString()
  @Field()
  source: string;
}
