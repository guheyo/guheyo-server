import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsUUID } from 'class-validator';

@InputType()
export class ReScheduleAuctionEndInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsDate()
  @Field(() => Date)
  extendedEndDate: Date;
}
