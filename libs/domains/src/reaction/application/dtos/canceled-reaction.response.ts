import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CanceledReactionResponse {
  @Field(() => ID)
  id: string;

  constructor(partial: Partial<CanceledReactionResponse>) {
    Object.assign(this, partial);
  }
}
