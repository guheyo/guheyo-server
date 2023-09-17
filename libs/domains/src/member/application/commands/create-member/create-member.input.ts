import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateMemberInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsUUID()
  @Field(() => ID)
  guildId: string;
}
