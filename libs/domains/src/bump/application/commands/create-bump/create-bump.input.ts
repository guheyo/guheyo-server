import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateBumpInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  type: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID)
  offerId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID)
  demandId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID)
  swapId?: string;

  @IsNumber()
  @Field(() => Int)
  oldPrice: number;

  @IsNumber()
  @Field(() => Int)
  newPrice: number;
}
