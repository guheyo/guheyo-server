import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class SignedUrlResponse {
  @IsString()
  @Field()
  signedUrl: string;

  @IsString()
  @Field()
  url: string;
}