export interface CreateMemberWithRolesInput {
  id: string;
  userId: string;
  groupId: string;
  roleIds: string[];
}

export interface CreateMembersOfUserInput {
  data: CreateMemberWithRolesInput[];
}
