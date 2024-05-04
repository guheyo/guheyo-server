import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class CreateReactionInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  emojiId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  postId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  commentId?: string;
}
