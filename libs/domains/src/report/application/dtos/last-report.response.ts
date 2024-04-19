import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LastReportResponse {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  constructor(partial: Partial<LastReportResponse>) {
    Object.assign(this, partial);
  }
}
