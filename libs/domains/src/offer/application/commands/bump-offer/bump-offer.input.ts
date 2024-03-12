import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class BumpOfferInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  offerId: string;

  @IsUUID()
  @Field(() => ID)
  sellerId: string;

  @IsNumber()
  @Field(() => Int)
  newPrice: number;
}
