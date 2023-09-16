import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteMemberInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  userId: string;
}
