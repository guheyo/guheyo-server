import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class FindBiddersWhereInput {
  @IsUUID()
  @Field(() => ID)
  auctionId: string;
}
