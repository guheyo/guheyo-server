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

  @IsString()
  @Field(() => String, { nullable: true })
  contentType?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsInt()
  @Field(() => Int, { nullable: true })
  height?: number;

  @IsInt()
  @Field(() => Int, { nullable: true })
  width?: number;

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
  @Field()
  tracked: boolean;

  @IsUUID()
  @Field(() => ID)
  userId: string;
}
