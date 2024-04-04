import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@ArgsType()
export class FindSwapCountArgs {
  @IsUUID()
  @Field(() => ID)
  proposerId: string;

  @IsUUID()
  @Field(() => ID)
  productCategoryId: string;

  @IsNumber()
  @Field(() => Int)
  fromHours: number;
}
