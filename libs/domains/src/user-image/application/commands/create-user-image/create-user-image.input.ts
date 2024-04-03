import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  contentType?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  size?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  height?: number;

  @IsOptional()
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

  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsString()
  @Field()
  source: string;
}
