import { Reflector } from '@nestjs/core';

export const GuildName = Reflector.createDecorator<string>();
