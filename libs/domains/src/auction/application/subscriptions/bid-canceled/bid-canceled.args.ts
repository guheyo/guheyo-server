import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class BidCanceledArgs {
  @IsUUID()
  @Field(() => ID)
  auctionId: string;
}
