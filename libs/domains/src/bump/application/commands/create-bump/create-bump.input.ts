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

  @IsUUID()
  @Field(() => ID)
  refId: string;

  @IsNumber()
  @Field(() => Int)
  oldPrice: number;

  @IsNumber()
  @Field(() => Int)
  newPrice: number;
}
