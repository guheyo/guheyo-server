import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindCommentArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  type?: string;

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
}
