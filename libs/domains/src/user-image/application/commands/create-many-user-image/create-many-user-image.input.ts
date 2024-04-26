import { ValidateNested } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CreateUserImageInput } from '../create-user-image/create-user-image.input';

@InputType()
export class CreateManyUserImageInput {
  @ValidateNested()
  @Type(() => CreateUserImageInput)
  @Field(() => [CreateUserImageInput])
  data: CreateUserImageInput[];
}
