import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LinkSocialProfileInput {
  @IsString()
  @Field()
  provider: string;
}
