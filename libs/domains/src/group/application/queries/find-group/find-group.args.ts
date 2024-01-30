import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindGroupArgs {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  slug?: string;
}
