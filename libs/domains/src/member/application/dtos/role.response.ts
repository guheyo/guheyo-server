import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class RoleResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  rank: number | null;

  @Field()
  hexColor: string = '#000000';

  constructor(partial: Partial<RoleResponse>) {
    Object.assign(this, partial);
  }
}
