import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field()
  endCursor: string;

  @Field(() => Boolean)
  hasNextPage: boolean;
}
