import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class FindGroupProfilesWhereInput {
  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  createdAt?: {
    gt: string;
  };

  @IsOptional()
  @Field(() => [ID], { nullable: true })
  groupIds?: string[];

  @IsOptional()
  @Field(() => [ID], { nullable: true })
  brandIds?: string[];
}
