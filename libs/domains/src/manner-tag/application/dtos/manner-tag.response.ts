import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MannerTagResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  isPositive: boolean;

  @Field(() => Int)
  position: number;

  constructor(partial: Partial<MannerTagResponse>) {
    Object.assign(this, partial);
  }
}
