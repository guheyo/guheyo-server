import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class FindPostPreviewArgs {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
