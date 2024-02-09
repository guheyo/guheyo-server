export interface MemberRolesSavePort {
  connectRoles(id: string, roleIds: string[], roleNames: string[]): Promise<void>;
  disconnectRoles(id: string, roleIds: string[], roleNames: string[]): Promise<void>;
}
