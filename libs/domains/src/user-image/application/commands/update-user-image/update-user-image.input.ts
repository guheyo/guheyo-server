import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserImageInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsInt()
  @Field(() => Int)
  position: number;
}
