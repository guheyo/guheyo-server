import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsInt, IsString, IsUUID } from 'class-validator';

@ObjectType()
export class UserImageResponse {
  @IsUUID()
  @Field()
  id: string;

  @IsDate()
  @Field()
  createdAt: Date;

  @IsDate()
  @Field()
  updatedAt: Date;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  url: string;

  @IsString()
  @Field(() => String, { nullable: true })
  contentType: string | null;

  @IsString()
  @Field(() => String, { nullable: true })
  description: string | null;

  @IsInt()
  @Field(() => Int, { nullable: true })
  height: number | null;

  @IsInt()
  @Field(() => Int, { nullable: true })
  width: number | null;

  @IsInt()
  @Field(() => Int)
  position: number;

  @IsString()
  @Field()
  type: string;

  @IsUUID()
  @Field(() => ID)
  refId: string;

  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsString()
  @Field()
  source: string;

  constructor(partial: Partial<UserImageResponse>) {
    Object.assign(this, partial);
  }
}
