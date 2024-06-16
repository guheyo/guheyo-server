import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateBidInput } from '../create-bid/create-bid.input';

@InputType()
export class CreateBidsInput {
  @ValidateNested()
  @Type(() => CreateBidInput)
  @Field(() => [CreateBidInput])
  bidInputs: CreateBidInput[];
}
