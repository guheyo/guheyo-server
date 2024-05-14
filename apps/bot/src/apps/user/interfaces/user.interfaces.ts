import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { Message } from 'discord.js';

export interface MessageWithUser {
  message: Message;
  user: MyUserResponse;
}
