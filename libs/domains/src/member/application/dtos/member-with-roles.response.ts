import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { RoleResponse } from './role.response';
import { MemberResponse } from './member.response';

@ObjectType()
export class MemberWithRolesResponse extends MemberResponse {
  @IsOptional()
  @Type(() => RoleResponse)
  @Field(() => [RoleResponse])
  roles: RoleResponse[];

  constructor(partial: Partial<MemberResponse>) {
    super(partial);
    Object.assign(this, partial);
  }
}
