import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class FollowUserInput {
  @IsUUID()
  @Field()
  followingId: string;
}
