import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class FindMyUserArgs {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
