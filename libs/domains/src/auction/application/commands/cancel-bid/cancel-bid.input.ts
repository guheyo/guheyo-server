import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CancelBidInput {
  @IsUUID()
  @Field()
  auctionId: string;

  @IsUUID()
  @Field()
  bidderId: string;
}
