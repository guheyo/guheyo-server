import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatedAuctionResponse {
  @Field(() => ID)
  id: string;

  @Field()
  updatedAt: Date;

  @Field(() => Date)
  extendedEndDate: Date;

  constructor(partial: Partial<UpdatedAuctionResponse>) {
    Object.assign(this, partial);
  }
}
