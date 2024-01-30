import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'discord.js';
import { MarketChannelType } from '../types/market-channel.type';
import { DiscordMarket, DiscordServer } from '../interfaces/discord-server.interface';

@Injectable()
export class DiscordConfigService {
  constructor(private readonly configService: ConfigService) {}

  getDiscordBotToken(): string {
    return this.configService.get('discord.bot.token')!;
  }

  getDiscordNamespace(): string {
    return this.configService.get('namespace.discord')!;
  }

  getGroupNamespace(): string {
    return this.configService.get('namespace.group')!;
  }

  getDiscordServers(): DiscordServer[] {
    return this.configService.get('discord.servers')!;
  }

  getDiscordBotOwnerId(): string {
    return this.configService.get('discord.bot.ownerId')!;
  }

  getDiscordServerIds(): string[] {
    return this.getDiscordServers().map((server) => server.id);
  }

  findDiscordMarket(type: MarketChannelType, message: Message): DiscordMarket | null {
    const servers = this.getDiscordServers();
    const server = servers.find(({ market }) =>
      market[type].channels.find((channel) => channel.id === message.channelId),
    );
    return server?.market || null;
  }

  findDiscordServerByMessage(message: Message): DiscordServer | null {
    const servers = this.getDiscordServers();
    return (
      servers.find((server) => this.findAllChannelIds(server).includes(message.channelId)) || null
    );
  }

  findDiscordServer(guildName: string): DiscordServer | null {
    const servers = this.getDiscordServers();
    return servers.find((server) => server.name === guildName) || null;
  }

  findAllChannelIds(server: DiscordServer): string[] {
    const channelIds = [
      ...server.market.wts.channels.map((channel) => channel.id),
      ...server.market.wtb.channels.map((channel) => channel.id),
      ...server.market.wtt.channels.map((channel) => channel.id),
      ...server.auction.channels.map((channel) => channel.id),
      ...server.community.channels.map((channel) => channel.id),
    ];
    return channelIds;
  }

  findMarketChannelIds(guildName: string, marketChannelType: MarketChannelType): string[] {
    const server = this.findDiscordServer(guildName);
    const channels = server?.market[marketChannelType].channels || [];
    return channels.map((c) => c.id);
  }
}
