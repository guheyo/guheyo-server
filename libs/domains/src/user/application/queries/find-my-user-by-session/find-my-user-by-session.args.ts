import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class FindMyUserBySessionArgs {
  @IsString()
  @Field()
  sessionToken: string;
}
