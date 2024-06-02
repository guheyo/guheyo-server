export interface DiscordServer {
  name: string;
  slug: string;
  id: string;
  market: DiscordMarket;
  auction: DiscordAuction;
  community: DiscordCommunity;
  command: DiscordCommand;
}

export interface DiscordMarket extends RolePermissions {
  wts: {
    channels: DiscordBaseChannel[];
  };
  wtb: {
    channels: DiscordBaseChannel[];
  };
  wtt: {
    channels: DiscordBaseChannel[];
  };
}

export interface DiscordAuction extends RolePermissions {
  channels: DiscordBaseChannel[];
}

export interface DiscordCommunity extends RolePermissions {
  channels: DiscordBaseChannel[];
}

export interface DiscordCommand {
  channels: DiscordChannel[];
}

export interface RolePermissions {
  allowedRoleIds: string[];
  disallowedRoleIds: string[];
}

export interface DiscordBaseChannel {
  id: string;
  name: string;
}

export interface DiscordChannel extends DiscordBaseChannel, RolePermissions {}
