import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TermResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  name: string;

  @Field(() => String)
  title: string | null;

  @Field(() => String)
  content: string | null;

  @Field()
  metaTitle: string;

  @Field()
  metaDescription: string;

  constructor(partial: Partial<TermResponse>) {
    Object.assign(this, partial);
  }
}
