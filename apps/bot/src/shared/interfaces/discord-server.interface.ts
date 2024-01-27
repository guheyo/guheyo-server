export interface DiscordServer {
  name: string;
  slug: string;
  id: string;
  market: DiscordMarket;
  auction: DiscordAuction;
  community: DiscordCommunity;
}

export interface DiscordMarket extends DiscordChannelRoles {
  wts: {
    channels: DiscordChannel[];
  };
  wtb: {
    channels: DiscordChannel[];
  };
  wtt: {
    channels: DiscordChannel[];
  };
}

export interface DiscordAuction extends DiscordChannelRoles {
  channels: DiscordChannel[];
}

export interface DiscordCommunity extends DiscordChannelRoles {
  channels: DiscordChannel[];
}

export interface DiscordChannelRoles {
  allowedRoleIds: string[];
  disallowedRoleIds: string[];
}

export interface DiscordChannel {
  id: string;
  name: string;
}
