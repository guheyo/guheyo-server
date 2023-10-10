export interface CreateMemberWithRolesInput {
  id: string;
  userId: string;
  guildId: string;
  roleIds: string[];
}

export interface CreateMembersOfUserInput {
  data: CreateMemberWithRolesInput[];
}
