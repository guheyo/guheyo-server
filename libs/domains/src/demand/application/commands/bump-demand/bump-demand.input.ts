import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class BumpDemandInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  demandId: string;

  @IsUUID()
  @Field(() => ID)
  buyerId: string;

  @IsNumber()
  @Field(() => Int)
  newPrice: number;
}
