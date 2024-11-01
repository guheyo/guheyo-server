import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindBrandsOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  follower?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: 'asc' | 'desc';
}
