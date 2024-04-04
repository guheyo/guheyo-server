import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID, Max } from 'class-validator';

@ArgsType()
export class FindOfferCountArgs {
  @IsUUID()
  @Field(() => ID)
  sellerId: string;

  @IsUUID()
  @Field(() => ID)
  productCategoryId: string;

  @Max(365 * 24)
  @IsNumber()
  @Field(() => Int)
  fromHours: number;
}
