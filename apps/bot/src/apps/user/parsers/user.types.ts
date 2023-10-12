import { Message } from 'discord.js';

export interface SimpleUser {
  id: string;
  username: string;
}

export interface UserWithMessage {
  user: SimpleUser;
  message: Message;
}

export interface UserWithDeletedModelId {
  user: SimpleUser;
  deletedModelId: string;
}
