import { Field, ID, InputType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';

@InputType()
export class FindBrandsWhereInput {
  @ValidateNested()
  @Field(() => [ID], { nullable: true })
  groupIds?: string[];
}
