import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryResponse {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Int, { nullable: true })
  position: number;

  constructor(partial: Partial<CategoryResponse>) {
    Object.assign(this, partial);
  }
}
