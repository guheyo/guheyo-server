import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindProductsWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  brandId?: string;
}
