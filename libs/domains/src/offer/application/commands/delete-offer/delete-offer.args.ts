import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class DeleteOfferArgs {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
