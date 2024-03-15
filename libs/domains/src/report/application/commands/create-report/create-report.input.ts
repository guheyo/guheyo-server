import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateReportInput {
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
  authorId: string;

  @IsString()
  @Field()
  title: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;
}
