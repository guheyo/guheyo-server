import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class FindSocialAccountConflictsWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  followed?: boolean;

  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  createdAt?: {
    gt: string;
  };
}
