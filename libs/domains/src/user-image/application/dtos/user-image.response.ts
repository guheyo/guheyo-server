import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsInt, IsString, IsUUID } from 'class-validator';

@ObjectType()
export class UserImageResponse {
  @IsUUID()
  @Field()
  id: string;

  @IsDate()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @IsDate()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

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

  constructor(partial: Partial<UserImageResponse>) {
    Object.assign(this, partial);
  }
}
