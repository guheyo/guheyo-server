import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CreateDemandBumpInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  demandId: string;

  @IsNumber()
  @Field(() => Int)
  oldPrice: number;

  @IsNumber()
  @Field(() => Int)
  newPrice: number;
}
