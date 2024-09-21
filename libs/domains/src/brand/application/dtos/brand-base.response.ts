import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BrandBaseResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  logo?: string;

  constructor(partial: Partial<BrandBaseResponse>) {
    Object.assign(this, partial);
  }
}
