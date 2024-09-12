import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlatformResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  logo?: string;

  @Field(() => Int)
  position: number;

  constructor(partial: Partial<PlatformResponse>) {
    Object.assign(this, partial);
  }
}
