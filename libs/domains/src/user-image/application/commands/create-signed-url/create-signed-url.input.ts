import { IsString, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSignedUrlInput {
  @IsString()
  @Field(() => String)
  type: string;

  @IsUUID()
  @Field(() => String)
  userId: string;

  @IsString()
  @Field(() => String)
  filename: string;
}
