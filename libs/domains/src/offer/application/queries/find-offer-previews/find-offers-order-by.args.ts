import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindOffersOrderByArgs {
  @IsOptional()
  @Field(() => String, { nullable: true })
  price?: 'asc' | 'desc';

  @IsOptional()
  @Field(() => String, { nullable: true })
  bumpedAt?: 'asc' | 'desc';
}
