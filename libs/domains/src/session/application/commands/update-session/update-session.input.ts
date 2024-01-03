import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateSessionInput {
  @IsString()
  @Field()
  sessionToken: string;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  expires?: Date;

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  userId?: string;
}
