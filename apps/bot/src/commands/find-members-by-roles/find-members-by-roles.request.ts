import { Role } from 'discord.js';
import { NumberOption, RoleOption } from 'necord';

export class FindMembersByRolesRequest {
  @NumberOption({
    name: 'limit',
    description: 'limit',
    required: true,
  })
  limit: number;

  @RoleOption({
    name: 'role0',
    description: 'role0',
    required: true,
  })
  role0: Role;

  @RoleOption({
    name: 'role1',
    description: 'role1',
    required: false,
  })
  role1: Role;

  @RoleOption({
    name: 'role2',
    description: 'role2',
    required: false,
  })
  role2: Role;
}
