import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindUsersWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  followed?: boolean;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isBot?: boolean;
}
