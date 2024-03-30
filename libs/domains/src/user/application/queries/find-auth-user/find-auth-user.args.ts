import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class FindAuthUserArgs {
  @IsString()
  @Field()
  provider: string;

  @IsString()
  @Field()
  socialId: string;
}
