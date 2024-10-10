import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindThreadPreviewArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  slug?: string;
}
