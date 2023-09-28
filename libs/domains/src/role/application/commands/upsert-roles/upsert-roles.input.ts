import { Field, InputType } from '@nestjs/graphql';
import { CreateRoleInput } from '../create-role/create-role.input';

@InputType()
export class UpsertRolesInput {
  @Field(() => [CreateRoleInput])
  upsertRoleInputs: CreateRoleInput[];
}
