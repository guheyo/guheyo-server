import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class FindUsersWhereArgs {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;
}
