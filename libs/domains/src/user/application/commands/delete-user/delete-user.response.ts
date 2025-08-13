import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteUserResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  deletedAt: Date;

  constructor(partial: Partial<DeleteUserResponse>) {
    Object.assign(this, partial);
  }
}
