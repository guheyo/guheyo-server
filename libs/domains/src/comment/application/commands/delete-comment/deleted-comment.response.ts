import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletedCommentResponse {
  @Field(() => ID)
  id: string;

  constructor(partial: Partial<DeletedCommentResponse>) {
    Object.assign(this, partial);
  }
}
