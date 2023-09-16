import { Module } from '@nestjs/common';
import { UserRegisteredFromDiscordHandler } from './user-registered-from-discord/user-registered-from-discord.handler';

const eventHandlers = [UserRegisteredFromDiscordHandler];

@Module({
  providers: [...eventHandlers],
  exports: [...eventHandlers],
})
export class UserEventModule {}
