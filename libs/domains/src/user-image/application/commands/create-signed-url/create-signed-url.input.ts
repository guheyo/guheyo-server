import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSignedUrlInput {
  @IsString()
  @Field(() => String)
  type: string;

  @IsString()
  @Field(() => String)
  filename: string;
}
