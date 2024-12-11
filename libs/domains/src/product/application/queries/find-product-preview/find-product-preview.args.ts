import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindProductPreviewArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  id?: string;
}
