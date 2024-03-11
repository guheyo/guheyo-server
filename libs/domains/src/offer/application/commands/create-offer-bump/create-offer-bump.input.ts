import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class CreateOfferBumpInput {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsUUID()
  @Field(() => ID)
  offerId: string;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  oldData?: any;

  @IsOptional()
  @Field(() => GraphQLJSON, { nullable: true })
  newData?: any;
}
