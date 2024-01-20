import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindGuildArgs {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  slug?: string;
}
