import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserCreateInput {
  @IsString()
  @Field()
  id: string;

  @IsString()
  @Field()
  username: string;
}
