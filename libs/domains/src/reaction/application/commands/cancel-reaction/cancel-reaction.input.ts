import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CancelReactionInput {
  @IsUUID()
  @Field(() => ID)
  reactionId: string;
}
