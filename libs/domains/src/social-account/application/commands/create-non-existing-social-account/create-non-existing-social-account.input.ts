import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateNonExistingSocialAccountInput {
  @IsString()
  @Field()
  provider: string;

  @IsString()
  @Field()
  socialId: string;

  @IsString()
  @Field()
  username: string;
}
