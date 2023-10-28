import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class PostCategoryResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Int, { nullable: true })
  position: number;

  constructor(partial: Partial<PostCategoryResponse>) {
    Object.assign(this, partial);
  }
}