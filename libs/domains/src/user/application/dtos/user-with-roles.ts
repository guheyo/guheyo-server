import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { RoleResponse } from '@lib/domains/role/application/dtos/role.response';
import { UserResponse } from './user.response';

@ObjectType()
export class UserWithRolesResponse extends UserResponse {
  @Type(() => RoleResponse)
  @Field(() => [RoleResponse])
  roles: RoleResponse[];

  constructor(partial: Partial<UserWithRolesResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
