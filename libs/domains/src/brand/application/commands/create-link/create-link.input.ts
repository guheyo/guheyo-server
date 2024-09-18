import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateLinkInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  brandId: string;

  @IsUUID()
  @Field(() => ID)
  platformId: string;

  @IsString()
  @Field()
  url: string;

  @IsNumber()
  @Field(() => Int)
  position: number;
}
