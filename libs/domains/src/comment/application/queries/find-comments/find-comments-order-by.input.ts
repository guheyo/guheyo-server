import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindCommentsOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';
}
