import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class GroupProfileResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  icon: string | null;

  constructor(partial: Partial<GroupProfileResponse>) {
    Object.assign(this, partial);
  }
}
