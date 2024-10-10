import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationResponse {
  @Field(() => Number)
  code: number;

  @Field()
  id: string;
}
