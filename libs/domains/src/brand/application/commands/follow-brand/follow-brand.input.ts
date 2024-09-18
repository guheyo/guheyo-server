import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class FollowBrandInput {
  @IsUUID()
  @Field(() => ID)
  brandId: string;
}
