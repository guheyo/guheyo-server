import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GroupStatus } from '../../domain/group.enums';

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
  description: string | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  icon: string | null;

  @Field(() => GroupStatus)
  status: GroupStatus;

  constructor(partial: Partial<GroupProfileResponse>) {
    Object.assign(this, partial);
  }
}
