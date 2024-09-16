import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UnfollowUserInput {
  @IsUUID()
  @Field()
  followingId: string;
}
