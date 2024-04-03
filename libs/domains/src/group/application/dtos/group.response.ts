import { RoleResponse } from '@lib/domains/role/application/dtos/role.response';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ProductCategoryResponse } from './product-category.response';
import { PostCategoryResponse } from './post-category.response';

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

  @Field(() => [RoleResponse])
  roles: RoleResponse[];

  @Field(() => [ProductCategoryResponse])
  productCategories: ProductCategoryResponse[];

  @Field(() => [PostCategoryResponse])
  postCategories: PostCategoryResponse[];

  constructor(partial: Partial<GroupResponse>) {
    Object.assign(this, partial);
  }
}
