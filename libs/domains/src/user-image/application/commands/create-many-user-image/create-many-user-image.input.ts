import { IsArray } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CreateUserImageInput } from '../create-user-image/create-user-image.input';

@InputType()
export class CreateManyUserImageInput {
  @IsArray()
  @Field(() => [CreateUserImageInput])
  data: CreateUserImageInput[];
}
