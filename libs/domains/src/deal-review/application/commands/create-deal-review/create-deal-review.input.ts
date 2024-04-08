import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateDealReviewInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  type: string;

  @IsUUID()
  @Field(() => ID)
  refId: string;

  @IsUUID()
  @Field(() => ID)
  refVersionId: string;

  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsUUID()
  @Field(() => ID)
  revieweeId: string;

  @IsUUID()
  @Field(() => ID)
  groupId: string;

  @IsString()
  @Field()
  title: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => [String])
  mannerTagIds: string[];
}
