import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class FindVersionPreviewArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  refId?: string;
}
