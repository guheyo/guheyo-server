import { RoleResponse } from '@lib/domains/role/application/dtos/role.response';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class GuildResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  description: string | null;

  @IsOptional()
  @Field(() => String, { nullable: true })
  icon: string | null;

  @Field(() => Int, { nullable: true })
  position: number;

  @Field(() => [RoleResponse])
  roles: RoleResponse[];

  constructor(partial: Partial<GuildResponse>) {
    Object.assign(this, partial);
  }
}
