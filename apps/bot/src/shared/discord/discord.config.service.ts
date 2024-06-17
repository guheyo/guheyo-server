import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Message } from 'discord.js';
import { MarketChannelType } from '../types/market-channel.type';
import {
  DiscordChannel,
  DiscordMarket,
  DiscordServer,
} from '../interfaces/discord-server.interface';

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

  getBotIconURL(): string {
    return this.configService.get('discord.bot.iconURL')!;
  }

  findDiscordMarket(type: MarketChannelType, message: Message): DiscordMarket | null {
    const servers = this.getDiscordServers();
    const server = servers.find(({ market }) =>
      market[type].channels.find((channel) => channel.id === message.channelId),
    );
    return server?.market || null;
  }

  findDiscordServerByChannelId(channelId: string): DiscordServer | null {
    const servers = this.getDiscordServers();
    return servers.find((server) => this.findAllChannelIds(server).includes(channelId)) || null;
  }

  findDiscordServer(guildName: string): DiscordServer | null {
    const servers = this.getDiscordServers();
    return servers.find((server) => server.name === guildName) || null;
  }

  findDiscordServerById(guildId: string): DiscordServer | null {
    const servers = this.getDiscordServers();
    return servers.find((server) => server.id === guildId) || null;
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

  findMarketChannelId(
    guildName: string,
    marketChannelType: MarketChannelType,
    categoryName: string,
  ): string | null {
    const server = this.findDiscordServer(guildName);
    const channel = server?.market[marketChannelType].channels.find((c) => c.name === categoryName);
    return channel ? channel.id : null;
  }

  findCommunityChannelId(guildName: string, channelName: string): string | null {
    const server = this.findDiscordServer(guildName);
    const channel = server?.community.channels.find((c) => c.name === channelName);
    return channel?.id || null;
  }

  findAuctionChannelId(guildName: string, channelName: string): string | null {
    const server = this.findDiscordServer(guildName);
    const channel = server?.auction.channels.find((c) => c.name === channelName);
    return channel?.id || null;
  }

  findCommandChannel(guildName: string, name: string): DiscordChannel | null {
    const servers = this.getDiscordServers();
    const server = servers.find((s) => s.name === guildName);
    const channel = server?.command.channels.find((c) => c.name === name);
    return channel || null;
  }
}
