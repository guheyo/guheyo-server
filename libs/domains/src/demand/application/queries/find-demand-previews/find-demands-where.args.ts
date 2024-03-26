import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class FindDemandsWhereArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  groupId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  productCategoryId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  buyerId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isHidden?: boolean;

  @IsOptional()
  @Field(() => String, { nullable: true })
  pending?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  bumpedAt?: {
    gt: string;
  };
}
