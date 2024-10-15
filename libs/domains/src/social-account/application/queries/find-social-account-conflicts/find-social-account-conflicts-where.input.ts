import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class FindSocialAccountConflictsWhereInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  status?: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  createdAt?: {
    gt: string;
  };

  @IsOptional()
  @Field(() => String, { nullable: true })
  provider?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  socialId?: string;
}
