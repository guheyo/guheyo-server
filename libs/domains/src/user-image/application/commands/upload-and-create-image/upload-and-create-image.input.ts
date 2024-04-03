import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class UploadAndCreateImageInput {
  @IsString()
  @Field()
  type: string;

  @IsUUID()
  @Field(() => ID)
  refId: string;

  @IsUUID()
  @Field(() => ID)
  userId: string;

  @IsString()
  @Field()
  url: string;

  @IsString()
  @Field()
  source: string;
}
