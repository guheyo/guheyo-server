import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';

@InputType()
export class UpdateSessionInput {
  @IsString()
  @Field()
  sessionToken: string;

  @IsDate()
  @Field(() => Date)
  expires: Date;

  @IsString()
  @Field()
  userId: string;
}
