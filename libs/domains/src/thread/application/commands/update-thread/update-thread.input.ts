import { UpdatePostInput } from '@lib/domains/post/application/commands/update-post/update-post.input';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

@InputType()
export class UpdateThreadInput {
  @ValidateNested()
  @Type(() => UpdatePostInput)
  @Field(() => UpdatePostInput)
  post: UpdatePostInput;

  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;
}
