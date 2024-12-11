import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductBaseResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  constructor(partial: Partial<ProductBaseResponse>) {
    Object.assign(this, partial);
  }
}
