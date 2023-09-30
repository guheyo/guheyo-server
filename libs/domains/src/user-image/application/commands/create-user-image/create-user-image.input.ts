import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateUserImageInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  url: string;

  @IsInt()
  @Field(() => Int)
  height: number;

  @IsInt()
  @Field(() => Int)
  width: number;

  @IsInt()
  @Field(() => Int)
  position: number;

  @IsString()
  @Field()
  type: string;

  @IsUUID()
  @Field(() => ID)
  refId: string;

  @IsBoolean()
  @Field(() => Boolean)
  tracked: boolean;

  @IsUUID()
  @Field(() => ID)
  userId: string;
}
