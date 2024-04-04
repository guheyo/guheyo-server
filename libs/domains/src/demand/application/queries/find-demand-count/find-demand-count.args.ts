import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID, Max } from 'class-validator';

@ArgsType()
export class FindDemandCountArgs {
  @IsUUID()
  @Field(() => ID)
  buyerId: string;

  @IsUUID()
  @Field(() => ID)
  productCategoryId: string;

  @Max(365 * 24)
  @IsNumber()
  @Field(() => Int)
  fromHours: number;
}
