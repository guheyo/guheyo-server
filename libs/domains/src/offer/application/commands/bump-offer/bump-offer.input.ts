import { Field, ID, InputType } from '@nestjs/graphql';
import { IsJSON, IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class BumpOfferInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  offerId: string;

  @IsUUID()
  @Field(() => ID)
  sellerId: string;

  @IsOptional()
  @IsJSON()
  @Field(() => GraphQLJSON, { nullable: true })
  newData?: any;
}
