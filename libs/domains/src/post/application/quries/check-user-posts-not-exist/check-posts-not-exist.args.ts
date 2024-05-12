import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CheckPostsNotExistArgs {
  @Field(() => [ID])
  ids: string[];
}
