import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindProductsOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdAt?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: 'asc' | 'desc';
}
