import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID, Max } from 'class-validator';

@ArgsType()
export class FindOfferCountArgs {
  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsUUID()
  @Field(() => ID)
  categoryId: string;

  @IsString()
  @Field(() => String)
  businessFunction: string;

  @Max(365 * 24)
  @IsNumber()
  @Field(() => Int)
  fromHours: number;
}
