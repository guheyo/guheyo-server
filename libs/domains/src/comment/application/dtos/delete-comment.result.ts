import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteCommentResult {
  @Field(() => ID)
  id: string;

  constructor(partial: Partial<DeleteCommentResult>) {
    Object.assign(this, partial);
  }
}
