import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateReportCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  reportId: string;

  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsString()
  @Field(() => String)
  content: string;
}
