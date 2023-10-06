import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@ArgsType()
export class FindUserImagesOfRefArgs {
  @IsString()
  @Field()
  type: string;

  @IsUUID()
  @Field(() => ID)
  refId: string;
}
