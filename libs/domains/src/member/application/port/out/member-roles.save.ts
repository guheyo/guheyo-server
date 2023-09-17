export interface MemberRolesSavePort {
  connectRoles(id: string, roleIds: string[]): Promise<void>;
  disconnectRoles(id: string, roleIds: string[]): Promise<void>;
}
