import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindAuthorsWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  followed?: boolean;
}
