import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsString()
  @Field()
  type: string;

  @IsString()
  @Field()
  source: string;

  @IsUUID()
  @Field(() => ID)
  authorId: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  parentId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  postId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  reportId?: string;

  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  auctionId?: string;

  @IsString()
  @Field(() => String)
  content: string;
}
