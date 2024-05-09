import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatedCommentResponse {
  @Field(() => ID)
  id: string;

  @Field()
  updatedAt: Date;

  @Field(() => String)
  content: string;

  constructor(partial: Partial<UpdatedCommentResponse>) {
    Object.assign(this, partial);
  }
}
