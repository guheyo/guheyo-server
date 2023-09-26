import { Field, ID, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class DeleteRoleArgs {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
