import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @IsUUID()
  @Field(() => ID)
  postId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;

  @IsBoolean()
  @Field(() => Boolean)
  pinned: boolean;
}
