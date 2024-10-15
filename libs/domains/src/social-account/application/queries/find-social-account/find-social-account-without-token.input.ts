import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FindSocialAccountWithoutTokenInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  provider?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  socialId?: string;
}
