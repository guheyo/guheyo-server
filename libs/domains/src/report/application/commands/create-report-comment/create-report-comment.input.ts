import { CommentType } from '@lib/domains/comment/domain/comment.types';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateReportCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field(() => String)
  type: CommentType;

  @IsUUID()
  @Field(() => ID)
  reportId: string;

  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsString()
  @Field(() => String)
  content: string;

  @IsString()
  @Field(() => String)
  source: string;
}
