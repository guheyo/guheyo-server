export interface GuildIdWithRoleIds {
  guildId: string;
  roleIds: string[];
}

export interface CreateMembersOfUserInput {
  userId: string;
  guildIdWithRoleIdsList: GuildIdWithRoleIds[];
}
