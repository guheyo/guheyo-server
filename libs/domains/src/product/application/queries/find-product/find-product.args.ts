import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindProductArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  id?: string;
}
