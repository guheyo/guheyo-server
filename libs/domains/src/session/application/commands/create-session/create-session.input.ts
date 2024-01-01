import { Field, InputType, ID } from '@nestjs/graphql';
import { IsDate, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateSessionInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

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
