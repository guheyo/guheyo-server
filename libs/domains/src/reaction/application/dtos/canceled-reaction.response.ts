import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class CanceledReactionResponse {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  postId: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  commentId: string | null;

  constructor(partial: Partial<CanceledReactionResponse>) {
    Object.assign(this, partial);
  }
}
