import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BrandResponse {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  logo?: string;

  @Field(() => Int)
  position: number;

  @Field(() => [GroupProfileResponse])
  groups: GroupProfileResponse[];

  constructor(partial: Partial<BrandResponse>) {
    Object.assign(this, partial);
  }
}
