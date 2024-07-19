import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindOfferPreviewsOrderByInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  price?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  bumpedAt?: 'asc' | 'desc';
}
