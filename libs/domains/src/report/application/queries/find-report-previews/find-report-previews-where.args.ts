import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@ArgsType()
export class FindReportPreviewsWhereArgs {
  @IsOptional()
  @Field(() => String, { nullable: true })
  type?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  refId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  authorId?: string;

  @IsOptional()
  @Field(() => ID, { nullable: true })
  reportedUserId?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  createdAt?: {
    gt: string;
  };
}
