import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class FindUserArgs {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  provider?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  socialId?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  username?: string;
}
