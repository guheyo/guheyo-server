import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class FindEmojisArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  groupId?: string;
}
