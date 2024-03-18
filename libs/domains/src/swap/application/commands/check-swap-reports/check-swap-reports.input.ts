import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CheckSwapReportsInput {
  @IsString()
  @Field(() => String)
  type: string;

  @IsUUID()
  @Field(() => ID)
  refId: string;
}
