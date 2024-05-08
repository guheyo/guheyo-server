import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@ArgsType()
export class ReactionCanceledArgs {
  @IsString()
  @Field()
  type: string;

  @IsUUID()
  @Field(() => ID)
  postId: string;
}
