import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UserDeleteInput {
  @IsUUID()
  @Field()
  id: string;
}
