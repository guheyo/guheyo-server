import { FindSocialAccountWithoutTokenInput } from '@lib/domains/social-account/application/queries/find-social-account/find-social-account-without-token.input';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class FindAuthorsWhereInput {
  @IsOptional()
  @Field(() => ID, { nullable: true })
  userId?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  followed?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => FindSocialAccountWithoutTokenInput)
  @Field(() => FindSocialAccountWithoutTokenInput, { nullable: true })
  socialAccount?: FindSocialAccountWithoutTokenInput;
}
