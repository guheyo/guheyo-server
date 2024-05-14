import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateReportInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  type: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  reportedPostId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  reportedCommentId?: string;

  @IsUUID()
  @Field(() => ID)
  reportedUserId: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsString()
  @Field()
  reason: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;
}
