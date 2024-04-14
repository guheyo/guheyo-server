import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class FindOffersWhereArgs {
  // Post
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

  // Offer
  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  bumpedAt?: {
    gt: string;
  };
}
