import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsString()
  @Field()
  type: string;

  @IsString()
  @Field()
  title: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [ID], { nullable: true })
  tagIds?: string[];
}
