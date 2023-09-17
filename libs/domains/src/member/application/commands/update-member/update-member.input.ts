import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

// NOTE: Do not change anything
@InputType()
export class UpdateMemberInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  userId: string;
}
