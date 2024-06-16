import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { Message } from 'discord.js';

export interface MessageWithSocialIdAndPrice {
  message: Message;
  socialId: string;
  price: number;
}

export interface BidMessageWithUser {
  message: Message;
  user: MyUserResponse;
  price: number;
}
