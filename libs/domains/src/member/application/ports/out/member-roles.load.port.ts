export interface MemberRolesLoadPort {
  findRoleIds(groupId: string, roleNames: string[]): Promise<string[]>;
}
