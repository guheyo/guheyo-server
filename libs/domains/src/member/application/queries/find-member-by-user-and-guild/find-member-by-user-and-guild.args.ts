import { Field, ID, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class FindMemberByUserAndGuildArgs {
  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsUUID()
  @Field(() => ID)
  guildId: string;
}
