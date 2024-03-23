import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class VersionResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  schemaName: string;

  @Field()
  tableName: string;

  @Field()
  op: string;

  @Field(() => ID)
  refid: string;

  @Field(() => GraphQLJSON)
  values: any;

  constructor(partial: Partial<VersionResponse>) {
    Object.assign(this, partial);
  }
}
