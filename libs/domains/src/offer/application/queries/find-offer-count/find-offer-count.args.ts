import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@ArgsType()
export class FindOfferCountArgs {
  @IsUUID()
  @Field(() => ID)
  sellerId: string;

  @IsUUID()
  @Field(() => ID)
  productCategoryId: string;

  @IsNumber()
  @Field(() => Int)
  fromHours: number;
}
