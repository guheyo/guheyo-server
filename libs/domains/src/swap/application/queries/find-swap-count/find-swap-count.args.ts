import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID, Max } from 'class-validator';

@ArgsType()
export class FindSwapCountArgs {
  @IsUUID()
  @Field(() => ID)
  proposerId: string;

  @IsUUID()
  @Field(() => ID)
  productCategoryId: string;

  @Max(365 * 24)
  @IsNumber()
  @Field(() => Int)
  fromHours: number;
}
