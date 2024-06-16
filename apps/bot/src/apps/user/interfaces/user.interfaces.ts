import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { GuildMember, Message } from 'discord.js';

export interface MessageWithUser {
  message: Message;
  user: MyUserResponse;
}

export interface MyUserWithMember {
  user: MyUserResponse;
  member: GuildMember;
}
