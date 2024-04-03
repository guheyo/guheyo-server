import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { Message } from 'discord.js';

export interface UserWithMessage {
  user: MyUserResponse;
  message: Message;
}

export interface UserWithDeletedModelId {
  user: MyUserResponse;
  deletedModelId: string;
}
