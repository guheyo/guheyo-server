import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateSwapBumpInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  swapId: string;

  @IsNumber()
  @Field(() => Int)
  oldPrice: number;

  @IsNumber()
  @Field(() => Int)
  newPrice: number;
}
