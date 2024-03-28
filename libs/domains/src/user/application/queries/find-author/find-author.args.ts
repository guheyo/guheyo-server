import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindAuthorArgs {
  @IsOptional()
  @IsUUID()
  @Field(() => ID, { nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  username?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  provider?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  socialId?: string;
}
