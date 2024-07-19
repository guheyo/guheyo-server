import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindUsersWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;
}
