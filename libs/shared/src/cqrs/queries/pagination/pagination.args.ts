import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @IsInt()
  @Field(() => Int, { defaultValue: 1 })
  skip: number;

  @IsInt()
  @Field(() => Int)
  take: number;

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  cursor?: string;
}
