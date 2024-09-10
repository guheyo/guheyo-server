import { GroupProfileResponse } from '@lib/domains/group/application/dtos/group-profile.response';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { LinkResponse } from './link.response';

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

  @Field(() => [GroupProfileResponse])
  groups: GroupProfileResponse[];

  @Field(() => [LinkResponse])
  links: LinkResponse[];

  constructor(partial: Partial<BrandResponse>) {
    Object.assign(this, partial);
  }
}
