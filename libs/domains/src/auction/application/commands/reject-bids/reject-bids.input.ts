import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class RejectBidsInput {
  @IsUUID()
  @Field()
  userId: string;
}
