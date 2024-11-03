export interface DiscordServer {
  name: string;
  slug: string;
  id: string;
  market: DiscordMarket;
  auction: DiscordAuction;
  thread: DiscordThread;
  command: DiscordCommand;
}

export interface DiscordMarket extends RolePermissions {
  wts: {
    channels: DiscordBaseChannel[];
    threads: DiscordBaseChannel[];
  };
  wtb: {
    channels: DiscordBaseChannel[];
    threads: DiscordBaseChannel[];
  };
  wtt: {
    channels: DiscordBaseChannel[];
    threads: DiscordBaseChannel[];
  };
}

export interface DiscordAuction extends RolePermissions {
  channels: DiscordBaseChannel[];
}

export interface DiscordThread extends RolePermissions {
  channels: DiscordThreadChannel[];
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

export interface DiscordThreadChannel extends DiscordBaseChannel {
  categorySource: string;
}
