import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatedAuctionResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  extendedEndDate: Date;

  @Field()
  status: string;

  constructor(partial: Partial<UpdatedAuctionResponse>) {
    Object.assign(this, partial);
  }
}
