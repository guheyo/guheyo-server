import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class CheckReportCommentsInput {
  @IsUUID()
  @Field(() => ID)
  reportId: string;
}
