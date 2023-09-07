import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UserCreateInput {
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @Field()
  username: string;
}
