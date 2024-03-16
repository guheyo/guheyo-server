import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class FindReportsWhereArgs {
  @IsOptional()
  @Field(() => String, { nullable: true })
  type?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  offerId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  demandId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  swapId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  createdAt?: {
    gt: string;
  };
}
