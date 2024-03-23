import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CommentReportInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  reportId: string;

  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsString()
  @Field()
  content: string;

  @IsString()
  @Field()
  source: string;
}
