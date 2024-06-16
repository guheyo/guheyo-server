import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;
}
