import { RoleResponse } from '@lib/domains/role/application/dtos/role.response';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CategoryResponse } from './category.response';
import { GroupStatus } from '../../domain/group.enums';

@ObjectType()
export class GroupResponse {
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

  @Field(() => Int, { nullable: true })
  position: number;

  @Field(() => GroupStatus)
  status: GroupStatus;

  @Field(() => [CategoryResponse])
  categories: CategoryResponse[];

  @Field(() => [RoleResponse])
  roles: RoleResponse[];

  constructor(partial: Partial<GroupResponse>) {
    Object.assign(this, partial);
  }
}
