import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindOffersOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  price?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  bumpedAt?: 'asc' | 'desc';
}
