import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateSessionInput {
  @IsString()
  @Field()
  sessionToken: string;

  @IsOptional()
  @IsDate()
  @Field(() => GraphQLISODateTime, { nullable: true })
  expires?: Date;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  userId?: string;
}
