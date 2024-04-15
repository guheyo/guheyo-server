import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class AddBidInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsNumber()
  @Field(() => Int)
  price: number;

  @IsString()
  @Field()
  priceCurrency: string;

  @IsUUID()
  @Field()
  auctionId: string;
}
