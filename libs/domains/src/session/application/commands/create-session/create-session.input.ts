import { Field, InputType, ID, GraphQLISODateTime } from '@nestjs/graphql';
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
  @Field(() => GraphQLISODateTime)
  expires: Date;

  @IsString()
  @Field()
  userId: string;
}
