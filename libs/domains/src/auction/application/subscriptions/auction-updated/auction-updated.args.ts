import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class AuctionUpdatedArgs {
  @IsUUID()
  @Field(() => ID)
  auctionId: string;
}
