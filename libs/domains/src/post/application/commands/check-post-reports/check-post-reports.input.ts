import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CheckPostReportsInput {
  @IsUUID()
  @Field(() => ID)
  postId: string;

  @IsString()
  @Field(() => String)
  reportStatus: string;
}
