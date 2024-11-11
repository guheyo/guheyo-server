import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReviewBaseResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => Int)
  rating: number;

  @Field(() => String)
  status: string;

  constructor(partial: Partial<ReviewBaseResponse>) {
    Object.assign(this, partial);
  }
}
