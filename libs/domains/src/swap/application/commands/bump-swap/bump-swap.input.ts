import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class BumpSwapInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  swapId: string;

  @IsUUID()
  @Field(() => ID)
  proposerId: string;

  @IsNumber()
  @Field(() => Int)
  newPrice: number;
}
