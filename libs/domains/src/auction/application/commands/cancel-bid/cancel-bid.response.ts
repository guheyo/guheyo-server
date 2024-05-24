import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CancelBidResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  canceledAt: Date;

  constructor(partial: Partial<CancelBidResponse>) {
    Object.assign(this, partial);
  }
}
