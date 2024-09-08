import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UnfollowBrandInput {
  @IsUUID()
  @Field(() => ID)
  brandId: string;
}
