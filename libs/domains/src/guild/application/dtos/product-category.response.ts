import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class ProductCategoryResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  slug: string | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Int, { nullable: true })
  position: number;

  constructor(partial: Partial<ProductCategoryResponse>) {
    Object.assign(this, partial);
  }
}
