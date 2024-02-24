import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class FindOffersWhereArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  groupId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  productCategoryId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  sellerId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  createdAt?: {
    gt: Date;
  };
}
