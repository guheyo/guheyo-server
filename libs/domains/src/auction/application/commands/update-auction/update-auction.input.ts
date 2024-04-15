import { UpdatePostInput } from '@lib/domains/post/application/commands/update-post/update-post.input';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateAuctionInput {
  @Field(() => UpdatePostInput)
  post: UpdatePostInput;

  @IsUUID()
  @Field(() => ID)
  id: string;
}
