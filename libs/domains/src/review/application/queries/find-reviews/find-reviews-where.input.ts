import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindReviewsWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  groupId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  pending?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isArchived?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  followed?: boolean;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  productId?: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  rating?: number;
}
