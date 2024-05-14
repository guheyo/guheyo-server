import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class FindReportCommentArgs {
  @IsUUID()
  @Field(() => ID)
  reportId: string;
}
