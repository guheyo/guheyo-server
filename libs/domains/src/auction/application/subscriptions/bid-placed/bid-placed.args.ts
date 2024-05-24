import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class BidPlacedArgs {
  @IsUUID()
  @Field(() => ID)
  auctionId: string;
}
