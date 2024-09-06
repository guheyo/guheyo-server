import { PlatformResponse } from '@lib/domains/platform/application/dtos/platform.response';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LinkResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field()
  url: string;

  @Field(() => PlatformResponse)
  platform: PlatformResponse;

  @Field()
  brandId: string;

  @Field(() => Int)
  position: number;

  constructor(partial: Partial<LinkResponse>) {
    Object.assign(this, partial);
  }
}
