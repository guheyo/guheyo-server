import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

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

  @Field(() => GraphQLJSON, { nullable: true })
  meta?: any;

  constructor(partial: Partial<TermResponse>) {
    Object.assign(this, partial);
  }
}
